const app = require("../app");

module.exports = (req, res) => {
  res.status(200).json({
    message: "App loaded successfully"
  });
};