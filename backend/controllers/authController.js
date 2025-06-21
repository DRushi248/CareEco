const User = require('../models/User');

const sendOtp = async (req, res) => {
  const { aadhaar } = req.body;
  if (!aadhaar || aadhaar.length !== 12) {
    return res.status(400).json({ error: 'Invalid Aadhaar' });
  }

  let user = await User.findOne({ aadhaar });
  if (!user) {
    user = new User({ aadhaar });
    await user.save();
  }

  const otp = '1234'; // mock
  res.json({ success: true, otp });
};

module.exports = { sendOtp };
