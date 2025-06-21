const User = require('../models/User');
const Candidate = require('../models/Candidate');

const getCandidates = async (req, res) => {
  const user = await User.findOne({ aadhaar: req.params.aadhaar });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const candidates = await Candidate.find({ constituency: user.constituency });
  res.json(candidates);
};

const vote = async (req, res) => {
  const { aadhaar, voteTo } = req.body;
  const user = await User.findOne({ aadhaar });

  if (!user || user.hasVoted) {
    return res.status(400).json({ error: 'User not eligible to vote' });
  }

  const candidate = await Candidate.findById(voteTo);
  if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

  candidate.votes += 1;
  await candidate.save();

  user.hasVoted = true;
  await user.save();

  res.json({ success: true });
};

module.exports = { getCandidates, vote };
