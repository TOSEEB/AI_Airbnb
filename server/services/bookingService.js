const Booking = require("../models/Booking");
const Stay = require("../models/Stay");
const { releaseNights } = require("./occupancyService");

const getBookings = async (userId) => {
  const now = new Date();

  await Booking.updateMany(
    {
      user: userId,
      status: "pending",
      holdExpiresAt: { $lte: now },
    },
    {
      $set: { status: "cancelled" },
    }
  );

  return Booking.find({
    user: userId,
  }).populate("stay");
};

const getHostBookings = async (hostId) => {
  const hostStays = await Stay.find({
    owner: hostId,
  }).select("_id");

  const stayIds = hostStays.map((stay) => stay._id);

  await Booking.updateMany(
    {
      stay: { $in: stayIds },
      status: "pending",
      holdExpiresAt: { $lte: new Date() },
    },
    {
      $set: { status: "cancelled" },
    }
  );

  return Booking.find({
    stay: {
      $in: stayIds,
    },
  })
    .populate("stay", "title location price images")
    .populate("user", "name email")
    .sort({
      createdAt: -1,
    });
};

const cancelGuestBooking = async (bookingId, userId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId,
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "cancelled") {
    return booking.populate("stay");
  }

  if (booking.status !== "pending") {
    throw new Error("Only unpaid holds can be cancelled from here");
  }

  await releaseNights(booking._id);
  booking.status = "cancelled";
  await booking.save();

  return booking.populate("stay");
};

module.exports = {
  getBookings,
  getHostBookings,
  cancelGuestBooking,
};
