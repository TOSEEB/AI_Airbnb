const mongoose = require("mongoose");

const occupancyNightSchema = new mongoose.Schema(
  {
    stay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    status: {
      type: String,
      enum: ["held", "confirmed"],
      default: "held",
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

occupancyNightSchema.index({ stay: 1, date: 1 }, { unique: true });
occupancyNightSchema.index({ booking: 1 });

module.exports = mongoose.model("OccupancyNight", occupancyNightSchema);
