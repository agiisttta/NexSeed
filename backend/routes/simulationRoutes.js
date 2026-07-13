const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  saveSimulation,
  getMySimulations,
} = require("../controllers/simulationController");

// Simpan simulasi

router.post("/save", protect, saveSimulation);

// Get riwayat simulasi

router.get("/history", protect, getMySimulations);

module.exports = router;
