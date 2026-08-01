const mongoose = require("mongoose");

const staySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      required: true,
      validate: [
        arr => arr.length > 0,
        "At least one image is required",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Villa",
    },

    rating: {
      type: Number,
      default: 4.8,
    },

    bedrooms: {
      type: Number,
      default: 2,
    },

    guests: {
      type: Number,
      default: 4,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stay", staySchema);