const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Chat", chatSchema);