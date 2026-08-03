const serverless = require("serverless-http");
const app = require("../app");
const { connectDatabase } = require("../config/db");

let connected = false;

module.exports = async (req, res) => {
  if (!connected) {
    await connectDatabase();
    connected = true;
  }

  return serverless(app)(req, res);
};
