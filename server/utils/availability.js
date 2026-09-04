const PENDING_HOLD_MS = 20 * 60 * 1000;

const overlappingBookingFilter = (stayId, checkIn, checkOut) => {
  const now = new Date();
  const holdAfter = new Date(Date.now() - PENDING_HOLD_MS);

  return {
    stay: stayId,
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
  };
};

module.exports = {
  PENDING_HOLD_MS,
  overlappingBookingFilter,
};
