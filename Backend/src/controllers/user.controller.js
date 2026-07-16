const userModel = require("../models/user.model")
const uploadFile = require("../services/storage.service")

const getMe = async (req, res) => {

    try {
        const user = await userModel.findById(req.id).select("-password");
        if (!user) {
            return res.status(400).json({
                message: 'user not Found'
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        res.staus(500).json({
            message: "somthing went Wrong",
            err: err.message
        })
    }

}

const profile = async (req, res) => {
    console.log('hit profile route');
    try {
        const file = req.file || req.files?.[0];
        const bio = req.body.bio;

        const user = await userModel.findById(req.id).select("-password");
        if (!user) {
            return res.status(400).json({
                message: 'user not Found'
            })
        };

        if (file) {
            const uploadAvtar = await uploadFile(file);
            user.avtar = uploadAvtar.url || uploadAvtar;
        }

        if (bio !== undefined) {
            user.bio = bio;
        }

        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


const logOut = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            httpOnly: true,
            sameSite: "strict"
        }).json({
            message: "logout Successfully",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "internal Server Isssu",
            err: err.message
        })
    }
}

const findUsers = async (req, res) => {
    console.log("hit finduser ")
    try {
        const { identifier } = req.body
        if (!identifier) {
            return res.status(400).json({
                message: "please fill all details"
            })
        }

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { mobileNumber: identifier }
            ]
        }).select("-password")

        if(!user){
            return res.status(404).json({
                message:"user Not Found"
            })
        }

        return res.status(200).json({
            message:"user Founded",
            user:user
        })

    } catch (err) {
        console.log(err,"somthing went wrong in finding User")     
        return res.status(500).json({
            message:"somthing went wrong in finding User"
        })
    }
}

module.exports = { getMe, logOut, profile, findUsers }