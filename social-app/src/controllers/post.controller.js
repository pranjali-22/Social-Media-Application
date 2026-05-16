const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const { caption, mediaUrls, mediaTypes, location, hashtags, taggedUsers } = req.body;

        const post = await Post.create({
            user: req.user.sub,
            caption,
            mediaUrls,
            mediaTypes,
            location,
            hashtags,
            taggedUsers
        });

        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username');
        if (!post) return res.status(404).json({ success: false, error: { message: 'Post not found' } });

        res.json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, error: { message: 'Post not found' } });
        if (post.user.toString() !== req.user.sub) return res.status(403).json({ success: false, error: { message: 'Unauthorized' } });

        await post.deleteOne();
        res.json({ success: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ success: false, error: { message: 'User not found' } });

        const posts = await Post.find({ user: user._id, isArchived: false })
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};