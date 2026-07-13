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

/* ==========================================
   CORS
========================================== */

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://nex-seed.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {

            // Mengizinkan request dari Postman atau server tanpa Origin
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("CORS tidak diizinkan."));
        },
        credentials: true
    })
);

// Body Parser
app.use(express.json());

/* ==========================================
   HOME
========================================== */

app.get("/", (req, res) => {
    res.send("NexSeed Backend Berjalan");
});

/* ==========================================
   TEST API
========================================== */

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API OK"
    });
});

/* ==========================================
   ROUTES
========================================== */

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/lkpd", lkpdRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/simulation", simulationRoutes);

/* ==========================================
   404
========================================== */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route tidak ditemukan."
    });
});

/* ==========================================
   START SERVER
========================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("================================");
    console.log(`🚀 Server berjalan di port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("================================");

});