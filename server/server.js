require("dotenv").config();

const app = require("./app");

const { port } = require("./utils/env");

const PORT = port || 5000;


// =======================
// LOCAL DEVELOPMENT ONLY
// =======================

if (process.env.NODE_ENV !== "production") {

  app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

  });

}


// =======================
// VERCEL EXPORT
// =======================

module.exports = app;