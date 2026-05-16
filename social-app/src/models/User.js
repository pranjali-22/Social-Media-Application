const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 30 },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isActive:   { type: Boolean, default: true },
    role:       { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcryptjs.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (plain) {
    return bcryptjs.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);