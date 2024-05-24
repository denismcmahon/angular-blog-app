const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user'
  },
  token: {
    type: String,
    required: false
  }     // token field if needed for password setup
});

const User = mongoose.model('User', userSchema);
module.exports = User;
