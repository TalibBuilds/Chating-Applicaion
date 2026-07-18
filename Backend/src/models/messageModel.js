const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        text: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            default: null,
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// TTL Index — createdAt se 7 din baad message automatically delete ho jayega
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 }); // 7 * 24 * 60 * 60 = 604800 seconds

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;
