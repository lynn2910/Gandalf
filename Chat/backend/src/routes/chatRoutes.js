const requireLogin = require('../middlewares/requireLogin');
const Chat = require('../models/Chat');

module.exports = app => {
    app.get('/api/chat/:id', requireLogin, async (req, res) => {
        const chat = await Chat.findOne({
            _id: req.params.id,
            _user: req.user.id,
        });
        res.send(chat);
    });
};