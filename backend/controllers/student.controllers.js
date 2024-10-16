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