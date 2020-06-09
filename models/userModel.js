const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Required a role'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Required a email'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Required a password'],
    trim: true,
  },
});

const userModel = mongoose.model('userModel', userSchema, 'users');

module.exports = userModel;
