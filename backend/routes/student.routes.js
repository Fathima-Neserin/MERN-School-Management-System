const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchStudents, 
    countStudents, 
    addNewStudent, 
    editStudentDetails,
    deleteStudent} = require('../controllers/student.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchStudents);
router.get("/count", authMiddleware, countStudents);

router.post("/newStudent", authMiddleware, addNewStudent);

router.put("/edit/:id", authMiddleware, editStudentDetails);

router.delete("/delete/:id", authMiddleware, deleteStudent);


module.exports = router;
