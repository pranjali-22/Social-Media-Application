const Like = require('../models/Like');
const Notification = require('../models/Notification');
const Post = require('../models/Post');

exports.likeTarget = async (req, res) => {
    try {
        const { targetId, targetType } = req.body;

        const existing = await Like.findOne({ user: req.user.sub, targetId, targetType });
        if (existing)
            return res.status(400).json({ success: false, error: { message: 'Already liked' } });

        await Like.create({ user: req.user.sub, targetId, targetType });

        if (targetType === 'post') {
            const post = await Post.findByIdAndUpdate(targetId, { $inc: { likeCount: 1 } }, { new: true });
            if (post && post.user.toString() !== req.user.sub) {
                await Notification.create({
                    recipient: post.user,
                    actor: req.user.sub,
                    type: 'like',
                    targetId,
                    targetType: 'post'
                });
            }
        }

        res.json({ success: true, message: 'Liked successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.unlikeTarget = async (req, res) => {
    try {
        const { targetId, targetType } = req.body;

        const like = await Like.findOneAndDelete({ user: req.user.sub, targetId, targetType });
        if (!like)
            return res.status(400).json({ success: false, error: { message: 'Not liked yet' } });

        if (targetType === 'post')
            await Post.findByIdAndUpdate(targetId, { $inc: { likeCount: -1 } });

        res.json({ success: true, message: 'Unliked successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.find({ targetId: req.params.targetId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.json({ success: true, data: likes });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};