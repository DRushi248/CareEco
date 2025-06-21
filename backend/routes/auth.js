const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { mobile } = req.body;
  let user = await User.findOne({ mobile });
  if (!user) {
    user = await User.create({
      name: `Voter ${mobile.slice(-4)}`,
      mobile,
      aadhar: 'XXXX XXXX 1234',
      voterId: 'VID' + mobile.slice(-4),
      constituency: 'Maharashtra',
    });
  }
  res.json(user);
});

module.exports = router;