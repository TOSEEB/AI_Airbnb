// Fix MongoDB SRV DNS issue on Windows
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const { port } = require("./utils/env");

const PORT = port || 5000;


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });

    console.log("✅ MongoDB Connected Successfully");

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error);

    process.exit(1);
  }
};


// Connect Database
connectDB();


// Start Server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}


module.exports = app;