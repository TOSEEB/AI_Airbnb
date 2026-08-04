console.log("BEFORE APP REQUIRE");

const app = require("../app");

console.log("AFTER APP REQUIRE");

module.exports = (req, res) => {
  console.log("HANDLER HIT");

  res.status(200).json({
    ok: true,
    message: "working"
  });
};
