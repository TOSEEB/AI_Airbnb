require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/db");
const { seedStays } = require("./config/seedData");
const { port } = require("./utils/env");

const PORT = port;

if (process.env.NODE_ENV !== "production") {
  connectDatabase()
    .then(async () => {
      console.log("Database connected");
      await seedStays();

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
} else {
  connectDatabase()
    .then(async () => {
      await seedStays();
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
}

module.exports = app;