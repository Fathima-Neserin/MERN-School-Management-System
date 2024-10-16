const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchStudents, countStudents } = require('../controllers/student.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchStudents);
router.get("/count", authMiddleware, countStudents);


module.exports = router;
