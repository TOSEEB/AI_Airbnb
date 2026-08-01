const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateTripSummary } = require('../utils/tripSummary');

test('calculates nightly totals correctly for a multi-night stay', () => {
  const summary = calculateTripSummary({ priceValue: 180 }, '2024-06-10', '2024-06-14', 2);

  assert.equal(summary.nights, 4);
  assert.equal(summary.subtotal, 720);
  assert.equal(summary.serviceFee, 72);
  assert.equal(summary.guestFee, 40);
  assert.equal(summary.total, 832);
});

test('returns null for invalid dates', () => {
  const summary = calculateTripSummary({ priceValue: 180 }, '2024-06-14', '2024-06-10', 2);

  assert.equal(summary, null);
});
