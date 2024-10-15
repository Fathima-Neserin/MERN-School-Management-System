const User = require("../models/user.models");
const asyncHandler = require("express-async-handler");


exports.fetchStaffs = asyncHandler(async(req, res) => {
    try {        
        const staffs = await User.find({role:"Staff"});

        if(staffs){
            res.status(200).json({ success:true, message: "Staff users fetched successfully", staffs})
        }
    } catch (error) {
        console.error("Error while fetching staff users : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})

exports.fetchLibrarians = asyncHandler(async(req, res) => {
    try {
        const librarians = await User.find({role:"Librarian"});
        if(librarians){
            res.status(200).json({success:true, message: "Librarian users fetched successfully", librarians})
        }
    } catch (error) {
        console.error("Error while fetching librarian users : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})

exports.createNewUser = asyncHandler(async(req, res) => {
    console.log("Welcome");
    
    try {
        console.log("POST /newUser request received: ", req.body);
        
        const { name, 
            email, 
            username, 
            password, 
            phoneNumber, 
            gender, 
            role } = req.body;
        if(!name || !email || !username || !password || !phoneNumber || !gender || !role){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const newUser = await User.create({
            name,
            email,
            username,
            password,
            phoneNumber,
            gender,
            role
        });
        await newUser.save();
        res.status(200).json({success:true, message:`New user " ${username} " creadted`, newUser})
    } catch (error) {
        console.error("Error while creating user : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})