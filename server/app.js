const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { isProduction } = require("./utils/env");
const { connectDatabase } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const stayRoutes = require("./routes/stayRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const aiRoutes = require("./routes/aiRoutes");
const plannerRoutes = require("./routes/plannerRoutes");
const chatRoutes = require("./routes/chatRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const errorHandler = require("./middleware/errorHandler");

const sendOTPEmail = require("./services/emailService");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await connectDatabase();
    next();
  } catch (err) {
    console.error("Database connection failed during request:", err.message);
    res.status(503).json({
      message:
        "Service unavailable. Database connection failed. Check MONGO_URI.",
    });
  }
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());



// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/stays", stayRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// AI Routes
// =======================

app.use("/api/ai", aiRoutes);
app.use("/api/ai", plannerRoutes);
app.use("/api/ai", chatRoutes);

// =======================
// Upload
// =======================

app.use("/api/upload", uploadRoutes);

// =======================
// Root Route
// =======================

app.get("/", (req, res) => {
  res.json({
    message: "AI Airbnb API is running",
    status: "ok",
  });
});

// =======================
// Health Check
// =======================

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongoUriExists: !!process.env.MONGO_URI,
    dbState: mongoose.connection.readyState,
    dbName: mongoose.connection.name || null,
    timestamp: new Date().toISOString(),
  });
});

// =======================
// Error Handler
// =======================

app.use(errorHandler);

module.exports = app;
