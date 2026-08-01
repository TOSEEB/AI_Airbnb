const {
  createReview,
  getReviews,
} = require("../services/reviewService");

const addReview = async (req, res) => {
  try {
    const review = await createReview(req.body, req.user.id);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStayReviews = async (req, res) => {
  try {
    const reviews = await getReviews(req.params.stayId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addReview,
  getStayReviews,
};