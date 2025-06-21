const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET voting stats for constituency
router.get('/:constituency', async (req, res) => {
  const { constituency } = req.params;

  const totalRegistered = await Voter.countDocuments({ constituency });
  const totalVoted = await Voter.countDocuments({ constituency, hasVoted: true });

  res.json({
    totalRegistered,
    totalVoted,
    pending: totalRegistered - totalVoted,
    constituency,
  });
});

module.exports = router;