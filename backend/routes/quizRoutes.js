const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  submitQuiz,
  getMyQuizHistory,
} = require("../controllers/quizController");

// Submit quiz

router.post("/submit", protect, submitQuiz);

// Get riwayat quiz

router.get("/history", protect, getMyQuizHistory);

module.exports = router;
