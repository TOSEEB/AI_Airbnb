const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../services/paymentService");

// ==========================
// Create Razorpay Order
// ==========================

const createOrder = async (req, res) => {
  try {
    const {
      stayId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    const data = await createRazorpayOrder(
      stayId,
      checkIn,
      checkOut,
      guests
    );

    res.status(200).json({
      order: data.order,
      tripSummary: data.tripSummary,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "Stay not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    if (err.message === "Invalid booking dates") {
      return res.status(400).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: "Failed to create Razorpay order",
    });
  }
};

// ==========================
// Verify Payment
// ==========================

const verifyPayment = async (req, res) => {
  try {
    const isValid = verifyRazorpayPayment(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};