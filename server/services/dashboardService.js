const Booking = require("../models/Booking");
const Review = require("../models/Review");

const getDashboard = async (userId) => {
  const bookings = await Booking.find({
    user: userId,
  }).populate("stay");

  const reviews = await Review.find({
    user: userId,
  }).populate("stay");

  return {
    bookings,
    reviews,
  };
};

module.exports = {
  getDashboard,
};