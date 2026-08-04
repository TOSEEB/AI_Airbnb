const serverless = require("serverless-http");

const { connectDatabase } = require("../config/db");
const app = require("../app");

const handler = serverless(app);

module.exports = async (req, res) => {

  await connectDatabase();

  return handler(req, res);

};