const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const stayRoutes = require("./routes/stayRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

const sendOTPEmail = require("./services/emailService");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


// Test Email Route
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


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stays", stayRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);


app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("AI Airbnb API is running");
});


module.exports = app;