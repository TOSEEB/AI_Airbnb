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

    console.error("Create Order Error:", err.message);



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



    // ==========================
    // Booking Availability Error
    // ==========================

    if (
      err.message ===
      "This stay is already booked for selected dates"
    ) {

      return res.status(400).json({
        message: err.message,
      });

    }



    // Other errors

    return res.status(500).json({

      message:
        err.message ||
        "Failed to create Razorpay order",

    });


  }
};



// ==========================
// Verify Payment
// ==========================

const verifyPayment = async (req, res) => {

  try {


    const isValid =
      verifyRazorpayPayment(req.body);



    if (!isValid) {

      return res.status(400).json({

        success: false,

        message:
          "Payment verification failed",

      });

    }



    return res.status(200).json({

      success: true,

      message:
        "Payment verified successfully",

    });



  } catch (err) {


    console.error(
      "Payment Verification Error:",
      err.message
    );


    return res.status(500).json({

      success: false,

      message:
        err.message ||
        "Verification failed",

    });


  }

};



module.exports = {
  createOrder,
  verifyPayment,
};