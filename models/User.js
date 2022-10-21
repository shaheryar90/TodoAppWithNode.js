const mongoose = require("mongoose");
const { userRole } = require("../config/constants")
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, 'Required Field cannot be left empty']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Required Field cannot be left empty'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Required Field cannot be left empty']
    },
    roleId: {
        type: Number,
        trim: true,
        required: [true, 'Required Field cannot be left empty'],
        default: userRole
    },
    imageUrl: {
        type: String,
        trim: true,
        // required: [true, 'Required Field cannot be left empty']
    },
    otp: {
        type: String,
        trim: true,
        required: false,
        
    },
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
