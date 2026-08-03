const mongoose = require("mongoose");

let cachedConnection = null;

const connectDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  try {
    cachedConnection = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });

    await cachedConnection;

    console.log("MongoDB connected");

    return cachedConnection;
  } catch (error) {
    cachedConnection = null;
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Database connection failed. Check MONGO_URI and network access.");
  }
};

module.exports = {
  connectDatabase,
};