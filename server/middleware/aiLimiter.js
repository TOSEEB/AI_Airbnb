const User = require("../models/User");

const DAILY_AI_LIMIT = 5;

const resetIfNewDay = (user) => {
  const today = new Date();

  if (
    !user.aiUsage.lastUsed ||
    user.aiUsage.lastUsed.toDateString() !== today.toDateString()
  ) {
    user.aiUsage.count = 0;
  }

  return today;
};

const aiLimiter = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    resetIfNewDay(user);

    if (user.aiUsage.count >= DAILY_AI_LIMIT) {
      return res.status(429).json({
        message: "You have reached your daily AI limit. Try again tomorrow.",
      });
    }

    next();
  } catch (error) {
    console.log("AI LIMITER ERROR:", error);

    res.status(500).json({
      message: "AI limiter failed",
    });
  }
};

const consumeAiCredit = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return;
  }

  const today = resetIfNewDay(user);
  user.aiUsage.count += 1;
  user.aiUsage.lastUsed = today;
  await user.save();
};

module.exports = aiLimiter;
module.exports.consumeAiCredit = consumeAiCredit;
