const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateHostSummary } = require('../utils/hostSummary');

test('builds host metrics from stays, bookings, and reviews', () => {
  const summary = calculateHostSummary({
    userId: 'user-1',
    stays: [
      { _id: 'stay-1', owner: 'user-1' },
      { _id: 'stay-2', owner: 'user-2' },
    ],
    bookings: [
      { stay: 'stay-1', totalPrice: 320 },
      { stay: 'stay-1', totalPrice: 480 },
      { stay: 'stay-2', totalPrice: 200 },
    ],
    reviews: [
      { stay: 'stay-1', rating: 5 },
      { stay: 'stay-1', rating: 4 },
    ],
  });

  assert.equal(summary.totalStays, 1);
  assert.equal(summary.totalBookings, 2);
  assert.equal(summary.totalReviews, 2);
  assert.equal(summary.totalRevenue, 800);
  assert.equal(summary.averageRating, 4.5);
});
