const Booking = require("../models/Booking");
const OccupancyNight = require("../models/OccupancyNight");
const { PENDING_HOLD_MS } = require("../utils/availability");
const { listingNights } = require("../utils/nights");

const DATES_UNAVAILABLE = "This stay is already booked for selected dates";

const isDuplicateKey = (err) =>
  err?.code === 11000 ||
  err?.writeErrors?.some((item) => item.code === 11000);

const expireHoldsForNights = async (stayId, nights) => {
  if (!nights.length) {
    return;
  }

  const now = new Date();

  const expired = await OccupancyNight.find({
    stay: stayId,
    date: { $in: nights },
    status: "held",
    expiresAt: { $lte: now },
  })
    .select("booking")
    .lean();

  if (!expired.length) {
    return;
  }

  const bookingIds = [
    ...new Set(expired.map((row) => String(row.booking))),
  ];

  await OccupancyNight.deleteMany({
    stay: stayId,
    date: { $in: nights },
    status: "held",
    expiresAt: { $lte: now },
  });

  await Booking.updateMany(
    {
      _id: { $in: bookingIds },
      status: "pending",
    },
    {
      $set: { status: "cancelled" },
    }
  );
};

const releaseNights = async (bookingId) => {
  await OccupancyNight.deleteMany({ booking: bookingId });
};

const refreshHold = async (bookingId, expiresAt) => {
  await OccupancyNight.updateMany(
    {
      booking: bookingId,
      status: "held",
    },
    {
      $set: { expiresAt },
    }
  );

  await Booking.findByIdAndUpdate(bookingId, {
    holdExpiresAt: expiresAt,
  });
};

const confirmNights = async (bookingId) => {
  const nights = await OccupancyNight.find({ booking: bookingId });

  if (!nights.length) {
    throw new Error(DATES_UNAVAILABLE);
  }

  await OccupancyNight.updateMany(
    { booking: bookingId },
    {
      $set: {
        status: "confirmed",
        expiresAt: null,
      },
    }
  );
};

const claimNights = async ({
  stayId,
  bookingId,
  checkIn,
  checkOut,
  expiresAt,
}) => {
  const nights = listingNights(checkIn, checkOut);

  if (!nights.length) {
    throw new Error("Invalid booking dates");
  }

  await expireHoldsForNights(stayId, nights);

  const docs = nights.map((date) => ({
    stay: stayId,
    date,
    booking: bookingId,
    status: "held",
    expiresAt,
  }));

  try {
    await OccupancyNight.insertMany(docs, { ordered: true });
  } catch (err) {
    await OccupancyNight.deleteMany({ booking: bookingId });

    if (isDuplicateKey(err)) {
      throw new Error(DATES_UNAVAILABLE);
    }

    throw err;
  }
};

const getUnavailableStayIds = async (checkIn, checkOut) => {
  const nights = listingNights(checkIn, checkOut);

  if (!nights.length) {
    return [];
  }

  const now = new Date();

  await OccupancyNight.deleteMany({
    date: { $in: nights },
    status: "held",
    expiresAt: { $lte: now },
  });

  const occupied = await OccupancyNight.distinct("stay", {
    date: { $in: nights },
  });

  const holdAfter = new Date(Date.now() - PENDING_HOLD_MS);

  const booked = await Booking.distinct("stay", {
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
    $or: [
      { status: "confirmed" },
      {
        status: "pending",
        $or: [
          { holdExpiresAt: { $gt: now } },
          { holdExpiresAt: null, createdAt: { $gte: holdAfter } },
        ],
      },
    ],
  });

  return [...new Set([...occupied, ...booked].map(String))];
};

module.exports = {
  DATES_UNAVAILABLE,
  claimNights,
  confirmNights,
  expireHoldsForNights,
  getUnavailableStayIds,
  refreshHold,
  releaseNights,
};
