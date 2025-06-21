const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Candidate = require('../models/Candidate');

// POST /api/vote
router.post('/', async (req, res) => {
  const { voterId, candidateId, constituency } = req.body;

  try {
    const voter = await Voter.findOne({ voterId });

    if (!voter || voter.hasVoted) {
      return res.status(400).json({ message: 'Invalid or already voted' });
    }

    // Save the vote
    const vote = new Vote({ voterId, candidateId, constituency });
    await vote.save();

    // Update voter's voting status
    voter.hasVoted = true;
    await voter.save();

    res.json({ message: 'Vote cast successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Vote submission failed', error: err.message });
  }
});


module.exports = router;