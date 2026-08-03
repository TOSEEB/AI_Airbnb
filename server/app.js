const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
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
  res.send("AI Airbnb API is running");
});

// =======================
// Error Handler
// =======================

app.use(errorHandler);

module.exports = app;