const serverless = require("serverless-http");
const app = require("../app");

const handler = serverless(app);

module.exports = async (req, res) => {
  console.log("FUNCTION START");

  // Database intentionally disabled
  return handler(req, res);
};
