const { getRecommendation } = require("../services/aiService");

const recommendStay = (req, res) => {
  try {
    const result = getRecommendation(req.body.prompt);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  recommendStay,
};

