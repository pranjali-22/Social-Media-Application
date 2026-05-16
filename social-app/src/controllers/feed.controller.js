const Post = require('../models/Post');
const Follow = require('../models/Follow');

exports.getHomeFeed = async (req, res) => {
    try {
        const following = await Follow.find({ follower: req.user.sub, status: 'accepted' })
            .select('following');

        const followingIds = following.map(f => f.following);

        const posts = await Post.find({
            user: { $in: followingIds },
            isArchived: false
        })
            .populate('user', 'username')
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

