const dns = require("dns");
const mongoose = require("mongoose");


dns.setDefaultResultOrder("ipv4first");


let cachedConnection = null;



const connectDatabase = async () => {


  if (cachedConnection) {
    return cachedConnection;
  }


  if (!process.env.MONGO_URI) {

    throw new Error(
      "MONGO_URI is missing"
    );

  }


  try {


    console.log(
      "Connecting MongoDB..."
    );


    const connection =
      await mongoose.connect(
        process.env.MONGO_URI,
        {
          serverSelectionTimeoutMS: 15000,
          connectTimeoutMS: 15000,
          family: 4,
        }
      );


    cachedConnection = connection;


    console.log(
      "MongoDB connected successfully"
    );


    return connection;


  } catch(error) {


    console.log(
      "MongoDB failed:",
      error.message
    );


    cachedConnection = null;


    throw error;

  }


};



module.exports = {
  connectDatabase,
};