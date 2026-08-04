console.log("APP START");

const express = require("express");

const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(express.json());


// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {

  console.log("ROOT HIT");

  res.json({
    message: "DEPLOY TEST 12345",
    status: "ok",
  });

});


// ======================
// HEALTH CHECK
// ======================

app.get("/health", (req, res) => {

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });

});


// ======================
// API TEST
// ======================

app.get("/api/test", (req, res) => {

  res.json({
    route: "test works",
  });

});


console.log("APP READY");


module.exports = app;