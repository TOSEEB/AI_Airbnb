console.log("VERCEL ENTRY");

const app = require("../app");
const { connectDatabase } = require("../db");

connectDatabase()
  .then(() => {
    console.log("DB READY");
  })
  .catch((err) => {
    console.log("DB ERROR", err.message);
  });

module.exports = app;
