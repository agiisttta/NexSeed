const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load Environment Variables
dotenv.config();

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const lkpdRoutes = require("./routes/lkpdRoutes");
const quizRoutes = require("./routes/quizRoutes");
const simulationRoutes = require("./routes/simulationRoutes");

// Connect MongoDB
connectDB();

// Init Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("NexSeed Backend Berjalan");
});

// Test API
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API OK",
  });
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/lkpd", lkpdRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/simulation", simulationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route tidak ditemukan",
  });
});

// Jalankan server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("");
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("");
});
