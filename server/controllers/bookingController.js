const { createRazorpayOrder } = require("../services/paymentService");
const {
  getBookings,
  getHostBookings,
  cancelGuestBooking,
} = require("../services/bookingService");

// ==========================
// Book Stay
// ==========================

const bookStay = async (req, res) => {
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

    res.status(201).json({
      order: data.order,
      tripSummary: data.tripSummary,
      bookingId: data.bookingId,
      holdExpiresAt: data.holdExpiresAt,
      message: "Dates held. Complete payment to confirm this booking",
    });
  } catch (err) {
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

    res.status(500).json({
      message: err.message,
    });
  }
};

// ==========================
// Guest Bookings
// ==========================

const getMyBookings = async (
  req,
  res
) => {
  try {

    const bookings = await getBookings(
      req.user.id
    );

    res.json(bookings);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ==========================
// Host Bookings
// ==========================

const getBookingsForHost = async (
  req,
  res
) => {

  try {

    const bookings =
      await getHostBookings(
        req.user.id
      );

    res.json(bookings);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

const cancelStayBooking = async (req, res) => {
  try {
    const booking = await cancelGuestBooking(req.params.id, req.user.id);

    res.json({
      booking,
      message: "Hold released",
    });
  } catch (err) {
    if (err.message === "Booking not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    if (err.message === "Only unpaid holds can be cancelled from here") {
      return res.status(400).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  bookStay,
  getMyBookings,
  getBookingsForHost,
  cancelStayBooking,
};