const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actor:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type:       { type: String, enum: ['like', 'comment', 'follow', 'mention', 'tag', 'reply'], required: true },
    targetId:   { type: mongoose.Schema.Types.ObjectId },
    targetType: { type: String, enum: ['post', 'comment', 'story'] },
    isRead:     { type: Boolean, default: false },
}, { timestamps: true });

notificationSchema.index({ recipient: 1, createdAt: -1 });

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);