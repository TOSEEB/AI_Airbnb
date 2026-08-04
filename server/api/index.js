const app = require("../app");
const { connectDatabase } = require("../config/db");

module.exports = async (req, res) => {
  try {
    console.log("Connecting DB...");
    await connectDatabase();
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({
      error: err.message,
    });
  }

  return app(req, res);
};