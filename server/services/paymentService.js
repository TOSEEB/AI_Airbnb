const Razorpay = require("razorpay");
const crypto = require("crypto");

const Stay = require("../models/Stay");
const {
  calculateTripSummary,
} = require("../utils/tripSummary");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================
// Create Razorpay Order
// ==========================

const createRazorpayOrder = async (
  stayId,
  checkIn,
  checkOut,
  guests = 1
) => {
  // Find stay from database
  const stay = await Stay.findById(stayId).lean();

  if (!stay) {
    throw new Error("Stay not found");
  }

  // Calculate trip summary
  const summary = calculateTripSummary(
    stay,
    checkIn,
    checkOut,
    guests
  );

  if (!summary) {
    throw new Error("Invalid booking dates");
  }

  // Create Razorpay Order
  const order = await razorpay.orders.create({
    amount: summary.total * 100, // Razorpay expects paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return {
    order,
    tripSummary: summary,
  };
};

// ==========================
// Verify Payment Signature
// ==========================

const verifyRazorpayPayment = (paymentData) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = paymentData;

  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(
      `${razorpay_order_id}|${razorpay_payment_id}`
    )
    .digest("hex");

  return generatedSignature === razorpay_signature;
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
};