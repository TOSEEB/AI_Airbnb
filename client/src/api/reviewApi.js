import api from "./axios";

export const createReview = (reviewData) => {
  return api.post("/reviews", reviewData);
};

export const getReviews = (stayId) => {
  return api.get(`/reviews/${stayId}`);
};

export const getReviewEligibility = (stayId) => {
  return api.get(`/reviews/eligibility/${stayId}`);
};