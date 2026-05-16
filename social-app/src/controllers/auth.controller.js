const User = require('../models/User');
const jwt = require('jsonwebtoken');
const redis = require('../config/redis');
require('dotenv').config();

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { sub: user._id, username: user.username, role: user.role, jti: user._id + Date.now() },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES }
    );
    const refreshToken = jwt.sign(
        { sub: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES }
    );
    return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) return res.status(400).json({ success: false, error: { message: 'Username or email already taken' } });

        const user = await User.create({ username, email, password });
        const { accessToken, refreshToken } = generateTokens(user);

        res.status(201).json({ success: true, data: { accessToken, refreshToken } });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};
