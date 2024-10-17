const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchLibraryHistories, 
    addNewLibraryHistory, 
    editLibraryHistory,
    deleteLibraryHistory} = require('../controllers/library.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchLibraryHistories);

router.post("/new", authMiddleware, addNewLibraryHistory);

router.put("/edit/:id", authMiddleware, editLibraryHistory);

router.delete("/delete/:id", authMiddleware, deleteLibraryHistory);

module.exports = router;