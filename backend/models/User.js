const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  aadhar: String,
  voterId: String,
  constituency: String,
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
