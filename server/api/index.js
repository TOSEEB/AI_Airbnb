console.log("VERCEL ENTRY START");

const app = require("../app");

const { connectDatabase } = require("../config/db");


let dbPromise = connectDatabase();


module.exports = async (req, res) => {

  await dbPromise;

  return app(req, res);

};