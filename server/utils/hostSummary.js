const calculateHostSummary = ({ userId, stays = [], bookings = [], reviews = [] }) => {
  const hostStays = stays.filter((stay) => stay.owner === userId || stay.owner?.toString() === userId);
  const hostBookings = bookings.filter((booking) => hostStays.some((stay) => stay._id?.toString() === booking.stay?.toString()));
  const hostReviews = reviews.filter((review) => hostStays.some((stay) => stay._id?.toString() === review.stay?.toString()));

  const totalRevenue = hostBookings.reduce((sum, booking) => sum + Number(booking.totalPrice || 0), 0);
  const averageRating = hostReviews.length
    ? hostReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / hostReviews.length
    : 0;

  return {
    totalStays: hostStays.length,
    totalBookings: hostBookings.length,
    totalReviews: hostReviews.length,
    totalRevenue,
    averageRating: Number(averageRating.toFixed(1)),
    recentBookings: hostBookings.slice(0, 3),
    recentReviews: hostReviews.slice(0, 3),
  };
};

module.exports = { calculateHostSummary };
