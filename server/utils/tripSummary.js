const calculateTripSummary = (
  stay,
  checkIn,
  checkOut,
  guests = 1
) => {
  if (!stay || !checkIn || !checkOut) return null;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end <= start
  ) {
    return null;
  }

  const nights = Math.round(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  const nightlyRate = Number(stay.price || 0);

  const subtotal = nightlyRate * nights;

  const total = subtotal;

  return {
    nights,
    nightlyRate,
    subtotal,
    serviceFee: 0,
    guestFee: 0,
    total,
  };
};

module.exports = {
  calculateTripSummary,
};