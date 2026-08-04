const serverless = require("serverless-http");

console.log("API FILE LOADED");

const app = require("../app");

module.exports = serverless(app);