const express = require('express');
const authMiddleware  = require('../middlewares/auth.middlewares');
const { fetchStaffs, 
    fetchLibrarians, 
    createNewUser, 
    updateExistingUser, 
    removeExistingUser,
    countStaffs,
    countLibrarians} = require('../controllers/user.controllers');

const router = express.Router();

router.get("/staff", authMiddleware, fetchStaffs);
router.get("/librarian", authMiddleware,fetchLibrarians);
router.get("/count/staff", authMiddleware, countStaffs);
router.get("/count/librarian", authMiddleware, countLibrarians)

router.post("/newUser", authMiddleware, createNewUser);

router.put("/edit/:id", authMiddleware, updateExistingUser);

router.delete("/remove/:id", authMiddleware, removeExistingUser)

module.exports = router;     