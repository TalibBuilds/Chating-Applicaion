const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log("hit hui") 
    try {
        const { email, userName, mobileNumber, password } = req.body;
        if (!email || !userName || !password || !mobileNumber) {
            return res.status(400).json({
                message: "fill all Details"
            });
        }
        const isUser = await userModel.findOne({
            $or: [
                { email },
                { mobileNumber },
                { userName }
            ]
        })
        if (isUser) {
            return res.status(409).json({
                message: "user Already exists"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            userName,
            email,
            mobileNumber,
            password: hashedpassword
        })
        const token = await jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });

        const userObj = user.toObject();
        delete userObj.password
        res.status(201).json({
            message: 'user create successfully',
            user: userObj
        });
    } catch (err) {
        console.log(err, "somthing went wrong"),
            res.status(500).json({
                message: "internal server Issu"
            })
    }
}

const loginUser = async (req, res) => {
    console.log("HIT lOGIN")
    try {
        const { Identifier , password } = req.body;
    if (!Identifier || !password) {
        return res.status(400).json({
            message: "please fill all fields"
        });
    }
    const isUser = await userModel.findOne({
        $or: [
            { email: Identifier },
            { mobileNumber: Identifier }
        ]
    }).select("+password")
    if (!isUser) {
        return res.status(404).json({
            message: "user Not Found"
        })
    }
    const IsPasswordMatch = await bcrypt.compare(password, isUser.password);
    if (!IsPasswordMatch) {
        return res.status(401).json({
            message: "Incorrect password"
        })
    }
    const token = jwt.sign(
        {
            id: isUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    const userObj = isUser.toObject();
    delete userObj.password;
    res.status(200).json({
        message: "User logged in successfully.",
        user: userObj
    });
} catch (err) {
    console.log(err, "error for Login")
    res.status(500).json({
        message: "Internal server error."
    })
}
}
 
module.exports = { registerUser, loginUser }
