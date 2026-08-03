require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/db");
const { port } = require("./utils/env");

const PORT = port;

if (process.env.NODE_ENV !== "production") {
  connectDatabase()
    .then(() => {
      console.log("Database connected");

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
} else {
  connectDatabase().catch((error) => {
    console.error("Database connection failed:", error);
  });
}

module.exports = app;