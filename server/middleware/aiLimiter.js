const User = require("../models/User");


const aiLimiter = async (req, res, next) => {

  try {

    const userId = req.user.id || req.user._id;


    const user = await User.findById(userId);


    if (!user) {

      return res.status(401).json({
        message: "User not found"
      });

    }


    const today = new Date();


    if (
      !user.aiUsage.lastUsed ||
      user.aiUsage.lastUsed.toDateString() !== today.toDateString()
    ) {

      user.aiUsage.count = 0;

    }


    const DAILY_AI_LIMIT = 5;


    if (user.aiUsage.count >= DAILY_AI_LIMIT) {

      return res.status(429).json({

        message:
          "You have reached your daily AI limit. Try again tomorrow."

      });

    }


    user.aiUsage.count += 1;

    user.aiUsage.lastUsed = today;


    await user.save();


    next();


  } catch (error) {

    console.log(
      "AI LIMITER ERROR:",
      error
    );


    res.status(500).json({

      message:
        "AI limiter failed"

    });

  }

};


module.exports = aiLimiter;