require('dotenv').config();

const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;
const http = require('http');
const { Server } = require('socket.io');
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
    origin: ['http://localhost:3000', 'http://localhost:8080'],
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
        sessionStore = new RedisStore({ client: redisClient });
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

// Configure session with store (Redis or memory)
app.use(session({
    store: sessionStore || new session.MemoryStore(),
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware
app.use((req, res, next) => {
    console.log('Utilisateur:', req.user);
    next();
});

// Initialize Socket.io
const io = new Server(server, {
    cors: corsOptions
});

// Socket.io middleware for authentication
io.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.passport && session.passport.user) {
        return next();
    }
    return next(new Error('Unauthorized'));
});

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-chat', (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    socket.on('send-message', async (data) => {
        try {
            const { chatId, message } = data;
            const Chat = mongoose.model('Chat');

            // Save message to database
            const chat = await Chat.findById(chatId);
            if (chat) {
                chat.messages.push({
                    content: message.content,
                    sender: message.sender,
                    timestamp: new Date()
                });
                await chat.save();

                // Broadcast message to all users in the chat
                io.to(chatId).emit('new-message', {
                    chatId,
                    message: chat.messages[chat.messages.length - 1]
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
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
