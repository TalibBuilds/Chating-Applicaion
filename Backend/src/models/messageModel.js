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

const messageModel = mongoose.model('Message', messageSchema);

module.exports =  messageModel ;