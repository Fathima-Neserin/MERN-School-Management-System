const Student = require("../models/student.models");
const asyncHandler = require("express-async-handler");


exports.fetchStudents = asyncHandler(async(req, res) => {
    try {        
        const students = await Student.find();

        if(students){
            res.status(200).json({ success:true, message: "Students fetched successfully", students})
        }
    } catch (error) {
        console.error("Error while fetching students : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.countStudents = asyncHandler(async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();

        res.status(200).json({
            success: true,
            message: "Count of students retrieved successfully",
            count: studentCount,
        });
    } catch (error) {
        console.error("Error while counting students:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


exports.addNewStudent = asyncHandler(async(req, res) => {
    
    try {
        const { studentId, 
            studentName, 
            standard, 
            age, 
            dob, 
            gender, 
            place,
            contactNumber } = req.body;
        if(!studentId || !studentName || !standard || !age || !dob || !gender || !place || !contactNumber){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const newStudent = await Student.create({
            studentId,
            studentName,
            standard,
            age,
            dob,
            gender,
            place,
            contactNumber
        });
        await newStudent.save();
        res.status(200).json({success:true, message:`New student " ${studentName} " added`, newStudent})
    } catch (error) {
        console.error("Error while adding new student : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})
