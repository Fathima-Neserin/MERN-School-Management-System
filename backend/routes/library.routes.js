const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchLibraryHistories } = require('../controllers/library.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchLibraryHistories);


module.exports = router;