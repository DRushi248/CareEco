const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  symbol: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Candidate', CandidateSchema);