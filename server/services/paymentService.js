const Razorpay = require("razorpay");
const crypto = require("crypto");

const Stay = require("../models/Stay");
const Booking = require("../models/Booking");

const { calculateTripSummary } = require("../utils/tripSummary");
const { PENDING_HOLD_MS } = require("../utils/availability");
const { sameStayDates } = require("../utils/nights");
const {
  claimNights,
  confirmNights,
  refreshHold,
  releaseNights,
} = require("./occupancyService");

const defaultRazorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })
    : null;

const createRazorpayOrder = async (
  stayId,
  checkIn,
  checkOut,
  guests = 1,
  userId,
  deps = {}
) => {
  const razorpay = deps.razorpay || defaultRazorpay;

  if (!userId) {
    throw new Error("User is required");
  }

  const stay = await Stay.findById(stayId).lean();

  if (!stay) {
    throw new Error("Stay not found");
  }

  const summary = calculateTripSummary(stay, checkIn, checkOut, guests);

  if (!summary) {
    throw new Error("Invalid booking dates");
  }

  if (!razorpay) {
    throw new Error(
      "Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
    );
  }

  const holdExpiresAt = new Date(Date.now() + PENDING_HOLD_MS);

  let booking = await Booking.findOne({
    user: userId,
    stay: stayId,
    status: "pending",
    holdExpiresAt: { $gt: new Date() },
  });

  if (booking && sameStayDates(booking, { checkIn, checkOut })) {
    booking.guests = guests;
    booking.totalPrice = summary.total;
    booking.holdExpiresAt = holdExpiresAt;
    await booking.save();
    await refreshHold(booking._id, holdExpiresAt);
  } else {
    if (booking) {
      await releaseNights(booking._id);
      await Booking.findByIdAndUpdate(booking._id, {
        status: "cancelled",
      });
    }

    booking = await Booking.create({
      user: userId,
      stay: stayId,
      checkIn,
      checkOut,
      guests,
      totalPrice: summary.total,
      status: "pending",
      holdExpiresAt,
    });

    try {
      await claimNights({
        stayId,
        bookingId: booking._id,
        checkIn,
        checkOut,
        expiresAt: holdExpiresAt,
      });
    } catch (err) {
      await Booking.findByIdAndUpdate(booking._id, {
        status: "cancelled",
      });
      throw err;
    }
  }

  let order;

  try {
    order = await razorpay.orders.create({
      amount: Math.round(summary.total * 100),
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: {
        bookingId: String(booking._id),
        stayId: String(stayId),
        userId: String(userId),
      },
    });
  } catch (error) {
    await releaseNights(booking._id);
    booking.status = "cancelled";
    await booking.save();
    throw error;
  }

  booking.razorpayOrderId = order.id;
  booking.status = "pending";
  booking.totalPrice = summary.total;
  booking.guests = guests;
  booking.holdExpiresAt = holdExpiresAt;
  await booking.save();

  return {
    order,
    tripSummary: summary,
    bookingId: booking._id,
    holdExpiresAt,
  };
};

const confirmPaidBooking = async ({ orderId, paymentId, userId }) => {
  if (!orderId || !paymentId) {
    return { success: false };
  }

  const alreadyPaid = await Booking.findOne({
    razorpayPaymentId: paymentId,
  });

  if (alreadyPaid) {
    if (
      alreadyPaid.status === "confirmed" &&
      alreadyPaid.razorpayOrderId === orderId &&
      (!userId || String(alreadyPaid.user) === String(userId))
    ) {
      return { success: true, booking: alreadyPaid };
    }

    throw new Error("Payment already used");
  }

  const now = new Date();
  const holdAfter = new Date(Date.now() - PENDING_HOLD_MS);

  const query = {
    razorpayOrderId: orderId,
    status: "pending",
    $or: [
      { holdExpiresAt: { $gt: now } },
      { holdExpiresAt: null, createdAt: { $gte: holdAfter } },
    ],
  };

  if (userId) {
    query.user = userId;
  }

  const booking = await Booking.findOneAndUpdate(
    query,
    {
      $set: {
        status: "confirmed",
        razorpayPaymentId: paymentId,
      },
    },
    { returnDocument: "after" }
  );

  if (!booking) {
    const existing = await Booking.findOne({
      razorpayOrderId: orderId,
      ...(userId ? { user: userId } : {}),
    });

    if (existing?.status === "confirmed") {
      return { success: true, booking: existing };
    }

    if (existing?.status === "pending") {
      await releaseNights(existing._id);
      existing.status = "cancelled";
      await existing.save();
      throw new Error("Payment hold expired. Please book again.");
    }

    throw new Error("Booking not found for this payment");
  }

  try {
    await confirmNights(booking._id);
  } catch (err) {
    booking.status = "payment_failed";
    await booking.save();
    await releaseNights(booking._id);
    throw err;
  }

  return {
    success: true,
    booking,
  };
};

const verifyRazorpayPayment = async (paymentData, userId, deps = {}) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = paymentData;

  const secret = deps.razorpaySecret || process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error("Razorpay is not configured");
  }

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return { success: false };
  }

  return confirmPaidBooking({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    userId,
  });
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
  confirmPaidBooking,
};
