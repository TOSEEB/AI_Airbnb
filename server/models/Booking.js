const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      default: 1,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "payment_failed"],
      default: "pending",
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    holdExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index(
  { razorpayPaymentId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      razorpayPaymentId: { $type: "string" },
    },
  }
);

bookingSchema.index({ stay: 1, status: 1, checkIn: 1, checkOut: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

const ensureBookingPaymentIndex = async () => {
  try {
    await Booking.collection.dropIndex("razorpayPaymentId_1");
  } catch (err) {
    if (err.code !== 27 && err.codeName !== "IndexNotFound") {
      console.warn("Could not drop razorpayPaymentId_1:", err.message);
    }
  }

  await Booking.updateMany(
    {
      $or: [{ razorpayPaymentId: null }, { razorpayPaymentId: "" }],
    },
    { $unset: { razorpayPaymentId: 1 } }
  );

  await Booking.syncIndexes();
};

module.exports = Booking;
module.exports.ensureBookingPaymentIndex = ensureBookingPaymentIndex;
 