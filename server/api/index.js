const serverless = require("serverless-http");

const app = require("../app");

console.log("API FILE LOADED");

module.exports = serverless(app);