require("dotenv").config();

const app = require("./app");

const { port } = require("./utils/env");

const PORT = port || 5000;


if (process.env.NODE_ENV !== "production") {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}


module.exports = app;