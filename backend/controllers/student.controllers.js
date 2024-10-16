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


exports.editStudentDetails = asyncHandler(async(req, res) => {
    try {
        const { studentId, 
            studentName, 
            standard, 
            age, 
            dob, 
            gender, 
            place,
            contactNumber } = req.body;

        const student = await Student.findById(req.params.id);
        
        if (student) {
            student.studentId = studentId || student.studentId;
            student.studentName = studentName || student.studentName;
            student.standard = standard || student.standard;
            student.age = age || student.age;
            student.dob = dob || student.dob;
            student.gender = gender || student.gender;
            student.place = place || student.place;
            student.contactNumber = contactNumber || student.contactNumber;

            const updatedStudent = await student.save();
            res.status(200).json({
                success: true,
                message: `${student.studentName} updated successfully`,
                updatedStudent
            });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        console.error("Error while editing student : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.deleteStudent = asyncHandler(async (req, res) => {
    try {
    
        const student = await Student.findById(req.params.id);

        if (student) {
            const deleteStudent = await student.deleteOne();
            res.status(200).json({
                success: true,
                message: `${student.studentName} deleted successfully`,
                deleteStudent,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }
    } catch (error) {
    
        console.error("Error while deleting student:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
