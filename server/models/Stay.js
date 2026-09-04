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


    // AI Generated Travel Recommendation Cache
    aiRecommendation: {

      summary: {
        type: String,
        default: "",
      },

      attractions: {
        type: [String],
        default: [],
      },

      food: {
        type: [String],
        default: [],
      },

      activities: {
        type: [String],
        default: [],
      },

      itinerary: {
        type: [String],
        default: [],
      },

      source: {
        type: String,
        default: "",
      },

      area: {
        type: String,
        default: "",
      },

    },

    geo: {
      lat: Number,
      lng: Number,
    },

    nearbyPlaces: {
      attractions: {
        type: [String],
        default: [],
      },
      food: {
        type: [String],
        default: [],
      },
      activities: {
        type: [String],
        default: [],
      },
      fetchedAt: Date,
    },


  },
  { timestamps: true }
);


module.exports = mongoose.model("Stay", staySchema);