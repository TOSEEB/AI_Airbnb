const serverless = require("serverless-http");
const app = require("../app");

const handler = serverless(app);

module.exports = async (req, res) => {
  console.log("FUNCTION START");
  return handler(req, res);
};
