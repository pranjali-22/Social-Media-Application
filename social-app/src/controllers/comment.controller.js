const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ success: false, error: { message: 'Post not found' } });

        const comment = await Comment.create({
            post: postId,
            user: req.user.sub,
            content
        });

        await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

        res.status(201).json({ success: true, data: comment });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });


        exports.getComments = async (req, res) => {
            try {
                const comments = await Comment.find({ post: req.params.postId, parent: null, isDeleted: false })
                    .populate('user', 'username')
                    .sort({ createdAt: -1 })
                    .limit(20);

                res.json({ success: true, data: comments });
            } catch (err) {
                res.status(500).json({ success: false, error: { message: err.message } });
            }
        };
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId, parent: null, isDeleted: false })
            .populate('user', 'username')
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ success: true, data: comments });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

