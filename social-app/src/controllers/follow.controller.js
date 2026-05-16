const Follow = require('../models/Follow');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const Notification = require('../models/Notification');

exports.followUser = async (req, res) => {
    try {
        const followingId = req.params.userId;
        const followerId = req.user.sub;

        if (followerId === followingId)
            return res.status(400).json({ success: false, error: { message: 'You cannot follow yourself' } });

        const existing = await Follow.findOne({ follower: followerId, following: followingId });
        if (existing)
            return res.status(400).json({ success: false, error: { message: 'Already following' } });

        await Follow.create({ follower: followerId, following: followingId });

        await Notification.create({
            recipient: followingId,
            actor: followerId,
            type: 'follow'
        });

        await UserProfile.findOneAndUpdate({ user: followerId }, { $inc: { followingCount: 1 } }, { upsert: true });
        await UserProfile.findOneAndUpdate({ user: followingId }, { $inc: { followerCount: 1 } }, { upsert: true });

        res.json({ success: true, message: 'Followed successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const followingId = req.params.userId;
        const followerId = req.user.sub;

        const follow = await Follow.findOneAndDelete({ follower: followerId, following: followingId });
        if (!follow)
            return res.status(400).json({ success: false, error: { message: 'Not following this user' } });

        await UserProfile.findOneAndUpdate({ user: followerId }, { $inc: { followingCount: -1 } });
        await UserProfile.findOneAndUpdate({ user: followingId }, { $inc: { followerCount: -1 } });

        res.json({ success: true, message: 'Unfollowed successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ success: false, error: { message: 'User not found' } });

        const followers = await Follow.find({ following: user._id })
            .populate('follower', 'username')
            .sort({ createdAt: -1 });

        res.json({ success: true, data: followers });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ success: false, error: { message: 'User not found' } });

        const following = await Follow.find({ follower: user._id })
            .populate('following', 'username')
            .sort({ createdAt: -1 });

        res.json({ success: true, data: following });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};