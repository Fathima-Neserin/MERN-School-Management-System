const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const generateTokenAndSetCookie = require("../utils/generateToken");
const User = require ("../models/user.models");

exports.userLogin = asyncHandler(async (req, res) =>{

    try {

        const { username , password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, error: "Username and Password are required" });
        }

        let user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "" )
        if(!user || !isPasswordCorrect){
            return res.status(400).json({ success: false, error:"Username or Password is incorrect"});
        }
        const token = generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            success: true, 
            message: `${username} logged in successfully!!!`,
            data: {
            _id: user._id ,
            username: user.username ,
            role: user.role ,
            token: token
            }
        })
    } catch (error) {
        console.error("Error while user login : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})

exports.userLogout = asyncHandler(async (req , res) => {
    try {
        await res.cookie("jwt","",{maxAge:0})
        res.status(200).json({ success:true , message:"Logged out successfully"})
    } catch (error) {
        console.error("Error occured while doing logout:", error.message);
        res.status(500).json({error: "Internal server error"})
    }
})