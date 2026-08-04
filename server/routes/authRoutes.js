const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  logout,
  getMe,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/auth");

// Authentication
router.post("/signup", signup);
router.post("/login", login);

// Email Verification
router.post("/verify", verifyOTP);
router.post("/resend-otp", resendOTP);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Protected Route
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

module.exports = router;