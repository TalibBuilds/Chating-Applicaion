const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: [true, "mobile number is required"]
    },
    bio:{
        type:String,
        default: ""
    },
    avtar: {
        type: String,
        default:""
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },

}, { timestamps: true })

const userModel = mongoose.model("user", userSchema);

module.exports = userModel