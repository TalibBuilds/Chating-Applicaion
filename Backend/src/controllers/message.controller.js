const messageModel = require('../models/messageModel');
const userModel = require('../models/user.model')

async function sendMessage(req, res) {
    try {
        console.log("hit send message")
        const senderId = req.id;
        const { receiverId } = req.params;
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "message text is required"
            });
        }

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            text,
        });

        return res.status(201).json({
            message: "message sent successfully",
            data: newMessage
        });

    } catch (err) {
        console.log(err, "something went wrong in sendMessage");
        return res.status(500).json({
            message: "something went wrong in sendMessage"
        });
    }
}


async function receiveMessage(req, res) {
    try {
        const myId = req.id;
        const { receiverId } = req.params;

        const messages = await messageModel.find({
            $or: [
                { senderId: myId, receiverId: receiverId },
                { senderId: receiverId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            message: "messages fetched successfully",
            data: messages
        });

    } catch (err) {
        console.log(err, "something went wrong in receiveMessage");
        return res.status(500).json({
            message: "something went wrong in receiveMessage"
        });
    }
}


async function getConversations(req, res) {
    try {
    console.log("hit Conversession")
        const myId = req.id;

        // Step 1: Saare messages dhundo jisme main involved hoon
        const messages = await messageModel.find({
            $or: [
                { senderId: myId },
                { receiverId: myId }
            ]
        }).sort({ createdAt: -1 }); // naye pehle

        // Step 2 & 3: Unique "doosre user" ki IDs nikalo
        const otherUserIds = new Set();
        const lastMessageMap = new Map(); // userId -> last message

        for (const msg of messages) {
            // Doosra user kaun hai — jo bhi mera ID nahi hai
            const otherUserId = msg.senderId.toString() === myId
                ? msg.receiverId.toString()
                : msg.senderId.toString();

            // Agar is user ka pehli baar mila hai (kyunki hum sorted hain naye→purane),
            // to ye already uska LAST message hai
            if (!otherUserIds.has(otherUserId)) {
                otherUserIds.add(otherUserId);
                lastMessageMap.set(otherUserId, msg);
            }
        }

        // Step 4: In unique IDs se poora user data fetch karo
        const users = await userModel.find({
            _id: { $in: [...otherUserIds] }
        }).select("-password");

        // Step 5: Har user ke sath uska last message bhi attach karo
        const conversations = users.map((user) => ({
            user,
            lastMessage: lastMessageMap.get(user._id.toString())
        }));

        return res.status(200).json({
            message: "conversations fetched successfully",
            data: conversations
        });

    } catch (err) {
        console.log(err, "something went wrong in getConversations");
        return res.status(500).json({
            message: "something went wrong in getConversations"
        });
    }
}

module.exports = { sendMessage, receiveMessage, getConversations };