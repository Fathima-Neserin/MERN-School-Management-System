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

exports.fetchLibrarians = asyncHandler(async(req,res) => {
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