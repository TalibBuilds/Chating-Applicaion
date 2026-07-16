const express = require('express');

const authRouter = express.Router() ;


// require Controller***********
const authController = require('../controllers/auth.controller');



authRouter.post('/register',authController.registerUser)
authRouter.post('/login',authController.loginUser)



module.exports = authRouter ;