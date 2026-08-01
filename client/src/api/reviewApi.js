import api from "./axios";

export const createReview = (reviewData) => {
  return api.post("/reviews", reviewData);
};

export const getReviews = (stayId) => {
  return api.get(`/reviews/${stayId}`);
};