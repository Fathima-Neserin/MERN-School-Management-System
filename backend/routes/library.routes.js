const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchLibraryHistories, 
    addNewLibraryHistory } = require('../controllers/library.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchLibraryHistories);

router.post("/new", authMiddleware, addNewLibraryHistory);

module.exports = router;