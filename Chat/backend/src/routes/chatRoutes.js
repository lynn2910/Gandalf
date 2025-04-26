const requireLogin = require('../middlewares/requireLogin');
const Chat = require('../models/Chat');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = (app, io) => {
    // Get online users
    app.get('/api/online-users', requireLogin, (req, res) => {
        try {
            // Access the onlineUsers Map from the parent scope
            const onlineUsers = Array.from(global.onlineUsers?.values() || []);
            res.send(onlineUsers);
        } catch (error) {
            console.error('Error fetching online users:', error);
            res.status(500).send({error: 'Error fetching online users'});
        }
    });
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

            // Sort participants to ensure consistent comparison
            participants.sort((a, b) => a.toString().localeCompare(b.toString()));

            // Check if a chat with the same participants already exists
            const existingChat = await Chat.findOne({
                participants: { $size: participants.length, $all: participants }
            }).populate('participants', 'displayName email');

            if (existingChat) {
                // Return the existing chat instead of creating a new one
                return res.status(200).send(existingChat);
            }

            // Create a new chat if no existing chat was found
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

            // Get the newly added message and populate sender information
            const populatedChat = await Chat.findById(chat._id)
                .populate({
                    path: 'messages.sender',
                    select: 'displayName email'
                });

            const newMessage = populatedChat.messages[populatedChat.messages.length - 1];

            // Emit the message to all participants via Socket.io
            if (io) {
                io.to(req.params.id).emit('new-message', {
                    chatId: req.params.id,
                    message: newMessage
                });
            }

            // Send the populated message back to the client
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
