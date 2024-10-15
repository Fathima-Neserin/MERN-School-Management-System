const express = require('express');
const authMiddleware  = require('../middlewares/auth.middlewares');
const { fetchStaffs, 
    fetchLibrarians, 
    createNewUser, 
    updateExistingUser } = require('../controllers/user.controllers');

const router = express.Router();

router.get("/staff", authMiddleware, fetchStaffs);
router.get("/librarian", authMiddleware,fetchLibrarians);

router.post("/newUser", authMiddleware, createNewUser);

router.put("/edit/:id", authMiddleware, updateExistingUser);

module.exports = router;     