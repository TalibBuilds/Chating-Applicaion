const express = require('express');
const multer = require('multer')

const userRouter = express.Router() ;

const authMiddleware = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller')

const upload = multer({
    storage:multer.memoryStorage()
})


// /api/user/{  } *******
userRouter.get('/me',authMiddleware,userController.getMe)
userRouter.patch('/profile',authMiddleware,upload.any(),userController.profile)
userRouter.get('/logout',authMiddleware,userController.logOut)
userRouter.post('/finduser',authMiddleware,userController.findUsers)




module.exports = userRouter ;