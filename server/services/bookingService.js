const Booking = require("../models/Booking");
const Stay = require("../models/Stay");
const { calculateTripSummary } = require("../utils/tripSummary");

// ==========================
// Create Booking
// ==========================

const createBooking = async (bookingData, userId) => {
  const { stayId, checkIn, checkOut, guests = 1 } = bookingData;

  const stay = await Stay.findById(stayId).lean();

  if (!stay) {
    throw new Error("Stay not found");
  }

  const summary = calculateTripSummary(
    stay,
    checkIn,
    checkOut,
    guests
  );

  if (!summary) {
    throw new Error("Invalid booking dates");
  }

  const booking = await Booking.create({
    user: userId,
    stay: stayId,
    checkIn,
    checkOut,
    guests,
    totalPrice: summary.total,
    status: "confirmed",
  });

  return {
    booking,
    tripSummary: summary,
  };
};

// ==========================
// Guest Bookings
// ==========================

const getBookings = async (userId) => {
  return Booking.find({
    user: userId,
  }).populate("stay");
};

// ==========================
// Host Bookings
// ==========================

const getHostBookings = async (hostId) => {

  // Find all stays owned by host

  const hostStays = await Stay.find({
    owner: hostId,
  }).select("_id");

  const stayIds = hostStays.map(
    (stay) => stay._id
  );

  // Find bookings for those stays

  return Booking.find({
    stay: {
      $in: stayIds,
    },
  })
    .populate(
      "stay",
      "title location price images"
    )
    .populate(
      "user",
      "name email"
    )
    .sort({
      createdAt: -1,
    });
};

module.exports = {
  createBooking,
  getBookings,
  getHostBookings,
};