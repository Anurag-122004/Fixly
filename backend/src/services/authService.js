const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    if (user && (await user.matchPassword(password))) {
        return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid email or password');
    }
    };

    module.exports = {
    registerUser,
    loginUser,
};