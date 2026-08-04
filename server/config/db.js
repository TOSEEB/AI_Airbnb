const dns = require("dns");
const mongoose = require("mongoose");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

let cachedConnection = null;

const connectDatabase = async () => {

  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  try {

    console.log("Connecting to MongoDB...");

    const connection = await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        family: 4,
        bufferCommands: false,
      }
    );

    cachedConnection = connection;

    console.log("MongoDB connected successfully");

    return connection;

  } catch (error) {

    cachedConnection = null;

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
};


module.exports = {
  connectDatabase,
};