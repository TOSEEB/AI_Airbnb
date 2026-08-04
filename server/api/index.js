const app = require("../app");
const { connectDatabase } = require("../config/db");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }

  return app(req, res);
};