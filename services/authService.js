const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (name, email, password, role) => {
  const user = await User.create({ name, email, password, role });
  console.log("registration successful✅");
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.error('User not found');
    throw new Error('Invalid email or password');
  }

  console.log('User found:', user);
  console.log('Entered password:', password);
  console.log('Stored hashed password:', user.password);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match result:', isMatch);

  if (!isMatch) {
    console.error('Password does not match');
    throw new Error('Invalid email or password');
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Set token and expiration on user
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();
  console.log('Reset token saved to user:', user.resetPasswordToken); // Debug log

  // Send email with reset token
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  await sendEmail({
    email: user.email,
    subject: 'Password reset token',
    message,
  });

  return { message: 'Email sent' };
};

const resetPassword = async (token, password) => {
  try {
    // Hash the token to match the stored token format
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log('Hashed token:', hashedToken); // Debug log

    // Find the user with the matching token and an expiration time greater than the current time
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    console.log('User found for password reset:', user);

    // Hash the new password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('New hashed password:', hashedPassword); // Debug log

    // Update the user's password with the newly hashed password
    user.password = hashedPassword;

    // Clear the reset token and expiration to prevent reuse
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user data back to the database
    await user.save();
    console.log('Password reset successful for user:', user); // Success log

    return { message: 'Password reset successful' };

  } catch (error) {
    console.error('Error resetting password:', error);
    throw new Error('Password reset failed');
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
