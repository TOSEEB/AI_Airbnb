const mongoose = require("mongoose");

const waitForDatabase = (timeoutMs = 20000) => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      mongoose.connection.off("connected", onConnected);
      reject(new Error("Database connection timed out"));
    }, timeoutMs);

    const onConnected = () => {
      clearTimeout(timer);
      resolve();
    };

    mongoose.connection.once("connected", onConnected);
  });
};

const requireDatabase = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await waitForDatabase();
    }

    return next();
  } catch (error) {
    return res.status(503).json({
      message:
        "Database is unavailable. Check MongoDB Atlas Network Access, your internet/VPN, and MONGO_URI.",
    });
  }
};

module.exports = requireDatabase;
