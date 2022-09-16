const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  date_Today: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  }
});

const Chat = mongoose.model("chat", userSchema);
module.exports = Chat;
