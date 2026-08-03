const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

// ======================
// Generate JWT
// ======================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      email: user.email,
      role: user.role || "guest",
    },
    process.env.JWT_SECRET || "dev-secret",
    {
      expiresIn: "7d",
      issuer: "ai-airbnb",
    }
  );
};

// ======================
// Find User by Email
// ======================
const getUserByEmail = async (email) => {
  console.log("---------------------");
  console.log("Checking email:", email);

  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  console.log(
    "Mongo user found:",
    user
      ? {
          email: user.email,
          isVerified: user.isVerified,
          otp: user.otp,
        }
      : null
  );

  return user;
};

// ======================
// Create User
// ======================
const createUser = async ({
  name,
  email,
  password,
  role = "guest",
  isVerified = false,
  otp = null,
  otpExpiry = null,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    isVerified,
    otp,
    otpExpiry,
  });

  console.log("Mongo user created:", user.email);

  return user;
};

module.exports = {
  generateToken,
  getUserByEmail,
  createUser,
};