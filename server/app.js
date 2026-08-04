const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Express working"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

module.exports = app;