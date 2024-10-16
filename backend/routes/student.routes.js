const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchStudents, 
    countStudents, 
    addNewStudent } = require('../controllers/student.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchStudents);
router.get("/count", authMiddleware, countStudents);

router.post("/newStudent", authMiddleware, addNewStudent);

module.exports = router;
