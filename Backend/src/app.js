const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieparser())
app.use(cors({
    origin: https://pulse-up-ap40.onrender.com,
    credentials: true
}))

// REQUIRE ROUTES HERE **********
const authRouter = require('../src/routes/auth.routes');
const userRouter = require('../src/routes/user.routes');
const messageRouter = require('./routes/message.routes');


// USE ROUTES*******
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);





module.exports = app;
