const express = require('express');
const authMiddleware = require("../middlewares/auth.middlewares");
const { fetchFeesHistories, addNewFeeHistory, editFeeHistory, deleteFeeHistory } = require('../controllers/fees.controllers');

const router = express.Router();

router.get("/", authMiddleware, fetchFeesHistories);

router.post("/new", authMiddleware, addNewFeeHistory);

router.put("/edit/:id", authMiddleware, editFeeHistory);

router.delete("/delete/:id", authMiddleware, deleteFeeHistory);

module.exports = router;