console.log("VERCEL ENTRY START");


const app = require("../app");

const { connectDatabase } = require("../config/db");


// Connect MongoDB

connectDatabase()
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {

    console.log(
      "DATABASE CONNECTION ERROR:",
      error.message
    );

  });



module.exports = app; 
