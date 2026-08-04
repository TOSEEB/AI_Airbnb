const serverless = require("serverless-http");

console.log("1. api/index.js loaded");

const app = require("../app");

const { connectDatabase } = require("../config/db");

console.log("2. app imported");


const handler = serverless(app);


let dbConnected = false;


module.exports = async (req, res) => {

  console.log("3. Request:", req.method, req.url);


  try {

    if (!dbConnected) {

      console.log("Connecting database...");

      await connectDatabase();

      dbConnected = true;

      console.log("Database connection initialized");

    }


    return handler(req, res);


  } catch (error) {

    console.error(
      "Serverless function error:",
      error.message
    );


    return res.status(500).json({

      message: "Server error",

      error: error.message,

    });

  }

};