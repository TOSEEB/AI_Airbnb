const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = null;

  // 1. Check Authorization Header
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. If no header token, check cookie
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  // 3. No token found
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = auth;