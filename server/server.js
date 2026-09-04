require("./config/dns");
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const { port } = require("./utils/env");
const { seedStays, seedAdmin } = require("./config/seedData");
const PORT = port || 5000;

let connecting = false;
let hasConnected = false;

const mongoOptions = {
  serverSelectionTimeoutMS: 20000,
  connectTimeoutMS: 20000,
  family: 4,
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (connecting) {
    return false;
  }

  connecting = true;

  try {
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    hasConnected = true;
    console.log("✅ MongoDB Connected Successfully");

    await seedAdmin();
    await seedStays();
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    console.error(
      "Allow your IP in Atlas Network Access, try another network/VPN off, and confirm MONGO_URI."
    );
    return false;
  } finally {
    connecting = false;
  }
};

mongoose.connection.on("disconnected", () => {
  if (!hasConnected || connecting) {
    return;
  }

  console.error("MongoDB disconnected. Retrying in 5s...");
  setTimeout(() => {
    connectDB();
  }, 5000);
});

const start = async () => {
  const connected = await connectDB();

  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      if (!connected) {
        console.error("API is up but MongoDB is not connected. Stays/auth will fail until Atlas is reachable.");
      }
    });
  }
};

start();

module.exports = app;
