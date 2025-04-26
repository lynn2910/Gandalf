const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String },
  discordId: { type: String },
  displayName: String,
  email: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
