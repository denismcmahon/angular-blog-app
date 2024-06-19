const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'user'
  },
  passwordSetToken: {
    type: String,
    required: false
  },     // token field if needed for password setup
  tokenExpires: {
    type: Date,
    required: false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
