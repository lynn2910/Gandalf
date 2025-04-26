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

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur MongoDB:', err));

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080'],
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Initialize Redis client and session store
let sessionStore;
let redisClient;

try {
    // Try to connect to Redis
    redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    // Set up event handlers for Redis
    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });

    redisClient.on('connect', () => {
        console.log('Connected to Redis');
    });

    // Connect to Redis
    redisClient.connect().then(() => {
        console.log('Redis client connected');
        sessionStore = new RedisStore({client: redisClient});
    }).catch(err => {
        console.error('Failed to connect to Redis:', err);
        // Use memory store as fallback
        sessionStore = new session.MemoryStore();
        console.log('Using memory store for sessions');
    });
} catch (err) {
    console.error('Error initializing Redis:', err);
    // Use memory store as fallback
    sessionStore = new session.MemoryStore();
    console.log('Using memory store for sessions');
}

// Create session middleware
const sessionMiddleware = session({
    store: sessionStore || new session.MemoryStore(),
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
});

// Use session middleware for Express
app.use(sessionMiddleware);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware
app.use((req, res, next) => {
    console.log('Utilisateur:', req.user);
    next();
});

// Track online users
const onlineUsers = new Map(); // Map of userId -> user data
// Make onlineUsers available globally
global.onlineUsers = onlineUsers;

// Initialize Socket.io
const io = new Server(server, {
    cors: corsOptions
});

// Use session middleware with Socket.io
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// Socket.io middleware for authentication
io.use((socket, next) => {
    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user) {
        return next();
    }
    return next(new Error('Unauthorized'));
});

// Socket.io connection handler
io.on('connection', async (socket) => {
    const userId = socket.request.session.passport.user;
    console.log('User connected:', socket.id, 'User ID:', userId);

    try {
        // Get user data from database
        const User = mongoose.model('User');
        const user = await User.findById(userId, 'displayName email');

        if (user) {
            // Add user to online users
            onlineUsers.set(userId, {
                _id: userId,
                displayName: user.displayName,
                email: user.email,
                socketId: socket.id
            });

            // Broadcast updated online users list to all clients
            io.emit('online-users-updated', Array.from(onlineUsers.values()));
        }
    } catch (error) {
        console.error('Error getting user data:', error);
    }

    socket.on('join-chat', (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    socket.on('send-message', async (data) => {
        try {
            const {chatId, message} = data;
            const Chat = mongoose.model('Chat');
            const userId = socket.request.session.passport.user;

            // Save message to database
            const chat = await Chat.findById(chatId);
            if (chat) {
                chat.messages.push({
                    content: message.content,
                    sender: userId, // Use the authenticated user's ID from the session
                    timestamp: new Date()
                });
                await chat.save();

                // Get the populated message with sender information
                const populatedChat = await Chat.findById(chatId)
                    .populate({
                        path: 'messages.sender',
                        select: 'displayName email'
                    });

                const newMessage = populatedChat.messages[populatedChat.messages.length - 1];

                // Broadcast message to all users in the chat
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

        // Remove user from online users
        if (userId) {
            onlineUsers.delete(userId);

            // Broadcast updated online users list to all clients
            io.emit('online-users-updated', Array.from(onlineUsers.values()));
        }
    });
});

// Routes
require('./routes/authRoutes')(app);
require('./routes/chatRoutes')(app, io);

app.get('/', (req, res) => {
    res.send('Salut!');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port: ${PORT}`);
});
