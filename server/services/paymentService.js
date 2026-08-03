const Razorpay = require("razorpay");
const crypto = require("crypto");

const Stay = require("../models/Stay");
const Booking = require("../models/Booking");

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

  // Find stay
  const stay = await Stay.findById(stayId).lean();

  if (!stay) {
    throw new Error("Stay not found");
  }


  // ==========================
  // CHECK AVAILABILITY BEFORE PAYMENT
  // ==========================

  const existingBooking = await Booking.findOne({

    stay: stayId,

    status: {
      $ne: "cancelled",
    },

    checkIn: {
      $lt: new Date(checkOut),
    },

    checkOut: {
      $gt: new Date(checkIn),
    },

  });


  if (existingBooking) {
    throw new Error(
      "This stay is already booked for selected dates"
    );
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



  // Create Razorpay Order ONLY after availability check

  const order = await razorpay.orders.create({

    amount: summary.total * 100,

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


  const generatedSignature =
    crypto
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