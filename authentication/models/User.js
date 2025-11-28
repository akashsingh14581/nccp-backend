const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    // ✅ For Forgot Password OTP
    resetOTP: String,
    resetOTPExpiry: Date,

    // ✅ To track how many times OTP was tried
    otpAttempts: {
        type: Number,
        default: 0
    }
})

// hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

module.exports = mongoose.model('User', userSchema);