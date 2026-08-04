console.log("BEFORE APP REQUIRE");

const app = require("../app");

console.log("AFTER APP REQUIRE");

module.exports = (req, res) => {
  console.log("HANDLER HIT");

  app(req, res);
};
