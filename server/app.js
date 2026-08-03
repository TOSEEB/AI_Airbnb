const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { isProduction } = require("./utils/env");

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
const chatRoutes = require("./routes/chatRoutes"); // NEW

const uploadRoutes = require("./routes/uploadRoutes");

const errorHandler = require("./middleware/errorHandler");

const sendOTPEmail = require("./services/emailService");

const app = express();

app.use(
  cors({
    origin: isProduction ? process.env.CLIENT_URL || "" : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// =======================
// Test Email Route
// =======================

app.get("/test-email", async (req, res) => {
  try {
    await sendOTPEmail(
      "toseebbeg02@gmail.com",
      "483921"
    );

    res.send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Email failed");
  }
});

// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/stays", stayRoutes);

app.use("/api/bookings", bookingRoutes);

// Payment Routes
app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/admin", adminRoutes);

// =======================
// AI Routes
// =======================

// AI Stay Assistant
app.use("/api/ai", aiRoutes);

// AI Planner
app.use("/api/ai", plannerRoutes);

// AI Chat (NEW)
app.use("/api/ai", chatRoutes);

// Upload
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

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// =======================
// Error Handler
// =======================

app.use(errorHandler);

module.exports = app;