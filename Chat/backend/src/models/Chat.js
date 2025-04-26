const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema]
});

module.exports = mongoose.model("Chat", chatSchema);
