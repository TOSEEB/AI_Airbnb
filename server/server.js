require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/db");
const { port } = require("./utils/env");

const PORT = port;

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