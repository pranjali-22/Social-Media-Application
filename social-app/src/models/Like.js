const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    targetId:   { type: mongoose.Schema.Types.ObjectId },
    targetType: { type: String, enum: ['post', 'comment', 'story'] },
}, { timestamps: true });

likeSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);