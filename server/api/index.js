const serverless = require("serverless-http");
const app = require("../app");
const { connectDatabase } = require("../config/db");

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await connectDatabase();
    return handler(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};