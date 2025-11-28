const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'NATIONALCOLLAGEOFCHESTPHYSICAN';

// ---------------------- Register Normal User ----------------------
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with role 'user' (never trust frontend)
    const user = new User({
      username,
      email,
      password,
      role: 'user'
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------- Login User/Admin ----------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token with role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOTP = otp;
  user.resetOTPExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
  user.otpAttempts = 0; // reset attempts count when new OTP is sent
  await user.save();

  // TODO: Send via Email/SMS
  console.log("OTP:", otp);

  res.json({ success: true, message: "OTP sent successfully" });
}

// to verify otp
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Check if OTP expired
  if (user.resetOTPExpiry < Date.now()) {
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    user.otpAttempts = 0;
    await user.save();
    return res.status(400).json({ message: "OTP expired. Request new OTP." });
  }

  // Check wrong attempts
  if (user.otpAttempts >= 3) {
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    user.otpAttempts = 0;
    await user.save();
    return res.status(429).json({ message: "Maximum attempts reached. Request new OTP." });
  }

  // If OTP is incorrect
  if (user.resetOTP !== otp) {
    user.otpAttempts += 1;
    await user.save();
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // If OTP is correct → reset everything
  user.resetOTP = null;
  user.resetOTPExpiry = null;
  user.otpAttempts = 0;
  await user.save();

  return res.json({ success: true, message: "OTP verified successfully. You may reset your password now." });
};

// to reset password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  
  const user = await User.findOne({ email });
  if(!user) return res.status(404).json({ message: "User not found" });

  user.password = newPassword; // Will auto-hash
  await user.save();

  res.json({ success: true, message: "Password reset successfully" });
};

