const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

exports.getProfile = async (req, res) => {
    // console.log("here")
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        // console.log(user)
        if (!user) return res.status(404).json({ success: false, error: { message: 'User not found' } });

        const profile = await UserProfile.findOne({ user: user._id });
        res.json({ success: true, data: { ...user.toObject(), profile } });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { fullName, bio, avatarUrl, websiteUrl, isPrivate } = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { user: req.user.sub },
            { fullName, bio, avatarUrl, websiteUrl, isPrivate },
            { new: true, upsert: true }
        );
        res.json({ success: true, data: profile });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};