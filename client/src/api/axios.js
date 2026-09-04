import axios from "axios";

const isPlaceholderUrl = (value) => {
  return (
    !value ||
    value.includes("your-backend-url") ||
    value.includes("YOUR_BACKEND_URL")
  );
};


const getBaseURL = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  // Production (Vercel)
  if (import.meta.env.PROD) {
    if (configuredUrl && !isPlaceholderUrl(configuredUrl)) {
      let normalized = configuredUrl.replace(/\/+$/, "");

      // Avoid localhost in production
      if (
        normalized.includes("localhost") ||
        normalized.includes("127.0.0.1")
      ) {
        return "/api";
      }

      // Add /api automatically if missing
      if (!normalized.endsWith("/api")) {
        normalized = `${normalized}/api`;
      }

      return normalized;
    }

    // fallback for Vercel serverless routes
    return "/api";
  }


  return "/api";
};


const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 60000,

  timeoutErrorMessage:
    "The request took too long. Please try again.",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


export default api;