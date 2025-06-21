const User = require('../models/User');
const Candidate = require('../models/Candidate');

const getStats = async (req, res) => {
  const { constituency } = req.params;

  const total = await User.countDocuments({ constituency });
  const voted = await User.countDocuments({ constituency, hasVoted: true });
  const pending = total - voted;
  const results = await Candidate.find({ constituency });

  res.json({ registered: total, voted, pending, results });
};

module.exports = { getStats };
