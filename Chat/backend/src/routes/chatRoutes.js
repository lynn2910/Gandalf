const requireLogin = require('../middlewares/requireLogin');
const Chat = require('../models/Chat');
const User = require('../models/User');
const mongoose = require('mongoose');

function handleError(res, error, message) {
    console.error(`${message}:`, error);
    res.status(500).send({ error: message });
}

async function getOnlineUsers(req, res) {
    try {
        const onlineUsers = Array.from(global.onlineUsers?.values() || []);
        res.send(onlineUsers);
    } catch (error) {
        handleError(res, error, 'Error fetching online users');
    }
}

async function getUserChats(req, res) {
    try {
        const chats = await Chat.find({
            participants: req.user._id
        })
            .populate('participants', 'displayName email')
            .populate({
                path: 'messages.sender',
                select: 'displayName email'
            });

        res.send(chats);
    } catch (error) {
        handleError(res, error, 'Error fetching chats');
    }
}

async function getChatById(req, res) {
    try {
        const chat = await Chat.findOne({
            _id: req.params.id,
            participants: req.user._id
        })
            .populate('participants', 'displayName email')
            .populate({
                path: 'messages.sender',
                select: 'displayName email'
            });

        if (!chat) {
            return res.status(404).send({ error: 'Chat not found' });
        }

        res.send(chat);
    } catch (error) {
        handleError(res, error, 'Error fetching chat');
    }
}

async function createChat(req, res) {
    try {
        const { participantIds } = req.body;

        if (!participantIds.includes(req.user._id.toString())) {
            participantIds.push(req.user._id.toString());
        }

        const participants = participantIds.map(id => new mongoose.Types.ObjectId(id));
        participants.sort((a, b) => a.toString().localeCompare(b.toString()));

        const existingChat = await Chat.findOne({
            participants: { $size: participants.length, $all: participants }
        }).populate('participants', 'displayName email');

        if (existingChat) {
            return res.status(200).send(existingChat);
        }

        const chat = new Chat({
            participants,
            messages: []
        });

        await chat.save();

        const populatedChat = await Chat.findById(chat._id)
            .populate('participants', 'displayName email');

        res.status(201).send(populatedChat);
    } catch (error) {
        handleError(res, error, 'Error creating chat');
    }
}

async function addMessage(req, res, io) {
    try {
        const { content } = req.body;

        const chat = await Chat.findOne({
            _id: req.params.id,
            participants: req.user._id
        });

        if (!chat) {
            return res.status(404).send({ error: 'Chat not found' });
        }

        chat.messages.push({
            content,
            sender: req.user._id,
            timestamp: new Date()
        });

        await chat.save();

        const populatedChat = await Chat.findById(chat._id)
            .populate({
                path: 'messages.sender',
                select: 'displayName email'
            });

        const newMessage = populatedChat.messages[populatedChat.messages.length - 1];

        if (io) {
            io.to(req.params.id).emit('new-message', {
                chatId: req.params.id,
                message: newMessage
            });
        }

        res.status(201).send(newMessage);
    } catch (error) {
        handleError(res, error, 'Error adding message');
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({}, 'displayName email');
        res.send(users);
    } catch (error) {
        handleError(res, error, 'Error fetching users');
    }
}

module.exports = (app, io) => {
    app.get('/api/online-users', requireLogin, getOnlineUsers);
    app.get('/api/chats', requireLogin, getUserChats);
    app.get('/api/chat/:id', requireLogin, getChatById);
    app.post('/api/chat', requireLogin, createChat);
    app.post('/api/chat/:id/message', requireLogin, (req, res) => addMessage(req, res, io));
    app.get('/api/users', requireLogin, getAllUsers);
};
