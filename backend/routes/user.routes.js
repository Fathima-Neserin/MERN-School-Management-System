const express = require('express');
const authMiddleware  = require('../middlewares/auth.middlewares');
const { fetchStaffs, fetchLibrarians } = require('../controllers/user.controllers');

const router = express.Router();

router.get("/staff", authMiddleware, fetchStaffs);
router.get("/librarian", authMiddleware, fetchLibrarians);


module.exports = router;