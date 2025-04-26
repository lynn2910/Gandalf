const requireLogin = require('../middlewares/requireLogin');
const Chat = require('../models/Chat');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = (app, io) => {
    // Get all chats for the current user
    app.get('/api/chats', requireLogin, async (req, res) => {
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
            console.error('Error fetching chats:', error);
            res.status(500).send({error: 'Error fetching chats'});
        }
    });

    // Get a specific chat by ID
    app.get('/api/chat/:id', requireLogin, async (req, res) => {
        console.log("FUCK THIS SHIT I'M OUT")
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
                return res.status(404).send({error: 'Chat not found'});
            }

            res.send(chat);
        } catch (error) {
            console.error('Error fetching chat:', error);
            res.status(500).send({error: 'Error fetching chat'});
        }
    });

    // Create a new chat
    app.post('/api/chat', requireLogin, async (req, res) => {
        try {
            const {participantIds} = req.body;

            // Ensure the current user is included in participants
            if (!participantIds.includes(req.user._id.toString())) {
                participantIds.push(req.user._id.toString());
            }

            // Convert string IDs to ObjectIds
            const participants = participantIds.map(id => new mongoose.Types.ObjectId(id));

            // Create a new chat
            const chat = new Chat({
                participants,
                messages: []
            });

            await chat.save();

            // Populate participants before sending response
            const populatedChat = await Chat.findById(chat._id)
                .populate('participants', 'displayName email');

            res.status(201).send(populatedChat);
        } catch (error) {
            console.error('Error creating chat:', error);
            res.status(500).send({error: 'Error creating chat'});
        }
    });

    // Add a message to a chat
    app.post('/api/chat/:id/message', requireLogin, async (req, res) => {
        try {
            const {content} = req.body;

            const chat = await Chat.findOne({
                _id: req.params.id,
                participants: req.user._id
            });

            if (!chat) {
                return res.status(404).send({error: 'Chat not found'});
            }

            // Add the message
            chat.messages.push({
                content,
                sender: req.user._id,
                timestamp: new Date()
            });

            await chat.save();

            // Get the newly added message
            const newMessage = chat.messages[chat.messages.length - 1];

            // Emit the message to all participants via Socket.io
            if (io) {
                io.to(req.params.id).emit('new-message', {
                    chatId: req.params.id,
                    message: newMessage
                });
            }

            res.status(201).send(newMessage);
        } catch (error) {
            console.error('Error adding message:', error);
            res.status(500).send({error: 'Error adding message'});
        }
    });

    // Get all users (for creating new chats)
    app.get('/api/users', requireLogin, async (req, res) => {
        try {
            const users = await User.find({}, 'displayName email');
            res.send(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send({error: 'Error fetching users'});
        }
    });
};
