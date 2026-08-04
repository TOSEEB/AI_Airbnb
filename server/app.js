console.log("APP START");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const stayRoutes = require("./routes/stayRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const aiRoutes = require("./routes/aiRoutes");
const plannerRoutes = require("./routes/plannerRoutes");
const chatRoutes = require("./routes/chatRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();


// =======================
// CORS
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // Frontend Vercel
  "https://ai-airbnb-sand.vercel.app",

  process.env.CLIENT_URL,

].filter(Boolean);


app.use(
  cors({

    origin: (origin, callback) => {

      // Postman/server requests
      if (!origin) {
        return callback(null, true);
      }


      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }


      console.log("Blocked CORS origin:", origin);

      return callback(null, false);

    },

    credentials: true,

  })
);


// =======================
// BODY PARSERS
// =======================

app.use(
  express.json({
    limit:"10mb",
  })
);


app.use(
  express.urlencoded({
    extended:true,
    limit:"10mb",
  })
);


app.use(cookieParser());



// =======================
// API ROUTES
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/stays", stayRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/admin", adminRoutes);


// =======================
// AI ROUTES
// =======================

app.use("/api/ai", aiRoutes);

app.use("/api/ai", plannerRoutes);

app.use("/api/ai", chatRoutes);


// =======================
// UPLOAD
// =======================

app.use("/api/upload", uploadRoutes);



// =======================
// ROOT
// =======================

app.get("/", (req,res)=>{

  res.json({
    message:"AI Airbnb API is running",
    status:"ok",
  });

});



// =======================
// HEALTH
// =======================

app.get("/health",(req,res)=>{

  res.json({

    status:"ok",

    mongoUriExists:!!process.env.MONGO_URI,

    dbState:mongoose.connection.readyState,

    dbName:mongoose.connection.name || null,

    timestamp:new Date().toISOString(),

  });

});



// =======================
// ERROR HANDLER
// =======================

app.use(errorHandler);


console.log("APP READY");


module.exports = app;