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

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ success: false, error: { message: 'Comment not found' } });
        if (comment.user.toString() !== req.user.sub)
            return res.status(403).json({ success: false, error: { message: 'Unauthorized' } });

        comment.isDeleted = true;
        await comment.save();

        await Post.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });

        res.json({ success: true, message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.replyComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId, parentId } = req.params;

        const parent = await Comment.findById(parentId);
        if (!parent) return res.status(404).json({ success: false, error: { message: 'Parent comment not found' } });

        const reply = await Comment.create({
            post: postId,
            user: req.user.sub,
            parent: parentId,
            content
        });

        await Comment.findByIdAndUpdate(parentId, { $inc: { replyCount: 1 } });

        res.status(201).json({ success: true, data: reply });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};
