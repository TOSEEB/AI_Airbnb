const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Stay = require("../models/Stay");

const hasCompletedStay = async (userId, stayId) => {
  return Booking.exists({
    user: userId,
    stay: stayId,
    status: "confirmed",
    checkIn: { $lte: new Date() },
  });
};

const createReview = async (reviewData, userId) => {
  const stayId = reviewData.stayId;
  const rating = Number(reviewData.rating);
  const comment = (reviewData.comment || "").trim();

  if (!stayId) {
    throw new Error("Stay is required");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (comment.length < 8) {
    throw new Error("Please write a slightly longer review");
  }

  const stay = await Stay.findById(stayId);

  if (!stay) {
    throw new Error("Stay not found");
  }

  const stayed = await hasCompletedStay(userId, stayId);

  if (!stayed) {
    throw new Error("You can only review a stay after a confirmed visit");
  }

  const existing = await Review.findOne({
    user: userId,
    stay: stayId,
  });

  if (existing) {
    throw new Error("You have already reviewed this stay");
  }

  const review = await Review.create({
    user: userId,
    stay: stayId,
    rating,
    comment,
  });

  const stats = await Review.aggregate([
    { $match: { stay: stay._id } },
    {
      $group: {
        _id: "$stay",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats[0]) {
    stay.rating = Math.round(stats[0].avgRating * 10) / 10;
    await stay.save();
  }

  await review.populate("user", "name");
  return review;
};

const getReviews = async (stayId) => {
  return Review.find({
    stay: stayId,
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });
};

const getReviewEligibility = async (userId, stayId) => {
  const alreadyReviewed = Boolean(
    await Review.exists({
      user: userId,
      stay: stayId,
    })
  );
  const stayed = Boolean(await hasCompletedStay(userId, stayId));

  return {
    canReview: stayed && !alreadyReviewed,
    alreadyReviewed,
    stayed,
  };
};

module.exports = {
  createReview,
  getReviews,
  getReviewEligibility,
};
