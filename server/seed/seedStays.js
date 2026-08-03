const mongoose = require("mongoose");
const Stay = require("../models/Stay");

mongoose
  .connect("YOUR_MONGODB_CONNECTION_STRING")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err)); 
  