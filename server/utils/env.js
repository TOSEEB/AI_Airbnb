const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];

const missing = requiredEnvVars.filter((key) => !process.env[key]);

if (missing.length > 0 && process.env.NODE_ENV === "production") {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

module.exports = {
  isProduction: process.env.NODE_ENV === "production",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  port: Number(process.env.PORT) || 5000,
};
