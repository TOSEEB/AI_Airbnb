const {
  createBooking,
  getBookings,
  getHostBookings,
} = require("../services/bookingService");

// ==========================
// Book Stay
// ==========================

const bookStay = async (req, res) => {
  try {

    const data = await createBooking(
      req.body,
      req.user.id
    );

    res.status(201).json({
      booking: data.booking,
      tripSummary: data.tripSummary,
      message: "Booking confirmed",
    });

  } catch (err) {

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

module.exports = {
  bookStay,
  getMyBookings,
  getBookingsForHost,
};