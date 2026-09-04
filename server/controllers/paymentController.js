const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../services/paymentService");

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
      guests,
      req.user.id
    );

    res.status(200).json({
      order: data.order,
      tripSummary: data.tripSummary,
      bookingId: data.bookingId,
      holdExpiresAt: data.holdExpiresAt,
    });
  } catch (err) {
    console.error("Create Order Error:", err.message);

    if (err.message === "Stay not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    if (
      err.message === "Invalid booking dates" ||
      err.message === "This stay is already booked for selected dates" ||
      err.message === "User is required"
    ) {
      return res.status(400).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message:
        err.message ||
        "Failed to create Razorpay order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const result = await verifyRazorpayPayment(req.body, req.user.id);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and booking confirmed",
      booking: result.booking,
    });
  } catch (err) {
    console.error("Payment Verification Error:", err.message);

    if (err.message === "Booking not found for this payment") {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    if (
      err.message === "This stay is already booked for selected dates" ||
      err.message === "Payment already used" ||
      err.message === "Payment hold expired. Please book again."
    ) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message || "Verification failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
