const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Express working"
  });
});

app.get("/health", (req, res) => {
  console.log("HEALTH ROUTE HIT");

  res.status(200).send("health working");
});

module.exports = app;