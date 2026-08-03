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

  const nights = Math.max(
    1,
    Math.round((end - start) / (1000 * 60 * 60 * 24))
  );

  const nightlyRate = Number(stay.priceValue ?? stay.price ?? 0);
  const guestCount = Math.max(1, Number(guests) || 1);
  const subtotal = nightlyRate * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const guestFee = guestCount > 1 ? 40 : 0;
  const total = subtotal + serviceFee + guestFee;

  return {
    nights,
    nightlyRate,
    subtotal,
    serviceFee,
    guestFee,
    total,
  };
};

module.exports = {
  calculateTripSummary,
};