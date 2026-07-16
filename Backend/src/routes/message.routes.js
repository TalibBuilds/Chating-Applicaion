const express = require('express');

const messageRouter = express.Router();


const authMiddleware = require('../middlewares/auth.middleware')
// controllers*****
const messageController = require('../controllers/message.controller')

messageRouter.get('/conversations', authMiddleware, messageController.getConversations)

messageRouter.post('/send/:receiverId', authMiddleware, messageController.sendMessage)
messageRouter.get('/:receiverId', authMiddleware, messageController.receiveMessage)




module.exports = messageRouter;