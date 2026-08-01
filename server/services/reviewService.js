const Review = require("../models/Review");

const createReview = async (reviewData, userId) => {
  return await Review.create({
    user: userId,
    stay: reviewData.stayId,
    rating: reviewData.rating,
    comment: reviewData.comment,
  });
};

const getReviews = async (stayId) => {
  return await Review.find({
    stay: stayId,
  }).populate("user", "name");
};

module.exports = {
  createReview,
  getReviews,
};