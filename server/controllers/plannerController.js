const Stay = require("../models/Stay");
const { generatePlannerRecommendation } = require("../services/plannerService");

const getPlannerRecommendation = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const stays = await Stay.find();

    const result = await generatePlannerRecommendation(
      prompt,
      stays
    );

    res.json(result);

  } catch (error) {
    console.log("PLANNER ERROR:", error);

    res.status(500).json({
      message: "Planner failed",
    });
  }
};

module.exports = {
  getPlannerRecommendation,
};

