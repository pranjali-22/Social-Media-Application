const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName:       { type: String, maxlength: 100 },
    bio:            { type: String, maxlength: 150 },
    avatarUrl:      { type: String },
    websiteUrl:     { type: String },
    dateOfBirth:    { type: Date },
    gender:         { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'] },
    isPrivate:      { type: Boolean, default: false },
    followerCount:  { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postCount:      { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);