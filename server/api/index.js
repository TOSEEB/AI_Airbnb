const serverless = require("serverless-http");

console.log("1. api/index.js loaded");

const app = require("../app");

console.log("2. app imported");

const handler = serverless(app);

module.exports = async (req, res) => {
  console.log("3. Request:", req.method, req.url);

  return handler(req, res);
};
