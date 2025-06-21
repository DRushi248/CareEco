const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

router.get('/live', async (req, res) => {
  const candidates = await Candidate.find().sort({ votes: -1 });
  const totalVotes = candidates.reduce((acc, c) => acc + c.votes, 0);

  const results = candidates.map((c) => ({
    name: c.name,
    party: c.party,
    votes: c.votes,
    percentage: totalVotes ? ((c.votes / totalVotes) * 100).toFixed(1) : 0,
    symbol: c.symbol,
  }));

  res.json(results);
});

module.exports = router;