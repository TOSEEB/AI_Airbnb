const dns = require("dns");
const mongoose = require("mongoose");

// Use a public DNS resolver for Atlas SRV lookups when local DNS blocks querySrv.
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

  console.log(
    "Mongo URI:",
    process.env.MONGO_URI.replace(/:([^:@]+)@/, ":*****@")
  );

  try {
    console.log("Connecting to MongoDB...");

    const connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      family: 4,
      bufferCommands: false,
    });

    cachedConnection = connectionPromise;

    const connection = await connectionPromise;

    console.log("MongoDB connected successfully");

    return connection;

  } catch (error) {
    cachedConnection = null;

    console.error("MongoDB connection failed:", error);

    throw error;
  }
};

module.exports = {
  connectDatabase,
};