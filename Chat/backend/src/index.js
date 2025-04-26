require('dotenv').config();

const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const {createClient} = require('redis');
const RedisStore = require('connect-redis').default;
const http = require('http');
const {Server} = require('socket.io');

require("./models/User");
require("./models/Chat");

const passport = require('passport');
require("./config/passport-config");

function connectToMongoDB() {
    return mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connecté à MongoDB'))
        .catch(err => console.error('Erreur MongoDB:', err));
}

function setupExpressApp() {
    const app = express();
    const server = http.createServer(app);

    const corsOptions = {
        origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080'],
        methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true,
        optionsSuccessStatus: 204
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    return {app, server, corsOptions};
}

async function setupRedisAndSession() {
    let sessionStore;
    let redisClient;

    try {
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        redisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });

        redisClient.on('connect', () => {
            console.log('Connected to Redis');
        });

        await redisClient.connect();
        console.log('Redis client connected');
        sessionStore = new RedisStore({client: redisClient});
    } catch (err) {
        console.error('Error initializing Redis:', err);
        sessionStore = new session.MemoryStore();
        console.log('Using memory store for sessions');
    }

    const sessionMiddleware = session({
        store: sessionStore || new session.MemoryStore(),
        secret: keys.cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    });

    return {sessionMiddleware};
}

function setupSocketIO(server, corsOptions, sessionMiddleware) {
    const io = new Server(server, {cors: corsOptions});
    const onlineUsers = new Map();
    global.onlineUsers = onlineUsers;

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));

    io.use((socket, next) => {
        if (socket.request.session?.passport?.user) {
            return next();
        }
        return next(new Error('Unauthorized'));
    });

    io.on('connection', async (socket) => {
        const userId = socket.request.session.passport.user;
        console.log('User connected:', socket.id, 'User ID:', userId);

        try {
            const User = mongoose.model('User');
            const user = await User.findById(userId, 'displayName email');

            if (user) {
                onlineUsers.set(userId, {
                    _id: userId,
                    displayName: user.displayName,
                    email: user.email,
                    socketId: socket.id
                });

                io.emit('online-users-updated', Array.from(onlineUsers.values()));
            }
        } catch (error) {
            console.error('Error getting user data:', error);
        }

        setupSocketEvents(socket, io, userId, onlineUsers);
    });

    return io;
}

function setupSocketEvents(socket, io, userId, onlineUsers) {
    socket.on('join-chat', (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    socket.on('send-message', async (data) => {
        try {
            const {chatId, message} = data;
            const Chat = mongoose.model('Chat');

            const chat = await Chat.findById(chatId);
            if (chat) {
                chat.messages.push({
                    content: message.content,
                    sender: userId,
                    timestamp: new Date()
                });
                await chat.save();

                const populatedChat = await Chat.findById(chatId)
                    .populate({
                        path: 'messages.sender',
                        select: 'displayName email'
                    });

                const newMessage = populatedChat.messages[populatedChat.messages.length - 1];

                io.to(chatId).emit('new-message', {
                    chatId,
                    message: newMessage
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        if (userId) {
            onlineUsers.delete(userId);
            io.emit('online-users-updated', Array.from(onlineUsers.values()));
        }
    });
}

async function startServer() {
    await connectToMongoDB();

    const {app, server, corsOptions} = setupExpressApp();
    const {sessionMiddleware} = await setupRedisAndSession();

    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    const io = setupSocketIO(server, corsOptions, sessionMiddleware);

    require('./routes/authRoutes')(app);
    require('./routes/chatRoutes')(app, io);

    app.get('/', (req, res) => {
        res.send('Salut!');
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Le serveur écoute sur le port: ${PORT}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
});
