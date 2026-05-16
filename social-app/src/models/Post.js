const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    caption:      { type: String, maxlength: 2200 },
    mediaUrls:    [{ type: String }],
    mediaTypes:   [{ type: String, enum: ['image', 'video'] }],
    location:     { type: String, maxlength: 100 },
    hashtags:     [{ type: String }],
    taggedUsers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likeCount:    { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    isArchived:   { type: Boolean, default: false },
}, { timestamps: true });

postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ hashtags: 1 });

module.exports = mongoose.model('Post', postSchema);