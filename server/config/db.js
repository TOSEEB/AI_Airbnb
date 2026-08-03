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
      serverSelectionTimeoutMS: 5000,
    });

    await cachedConnection;

    console.log("MongoDB connected");

    return cachedConnection;

  } catch (error) {
    cachedConnection = null;
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = {
  connectDatabase,
};