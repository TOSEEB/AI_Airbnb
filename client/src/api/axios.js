import axios from "axios";

const isPlaceholderUrl = (value) => {
  return !value || value.includes("your-backend-url") || value.includes("YOUR_BACKEND_URL");
};

const getBaseURL = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (import.meta.env.PROD) {
    if (configuredUrl && !isPlaceholderUrl(configuredUrl)) {
      const normalized = configuredUrl.replace(/\/+$/, "");

      if (normalized.includes("localhost") || normalized.includes("127.0.0.1")) {
        return "/api";
      }

      return normalized;
    }

    return "/api";
  }

  if (configuredUrl && !isPlaceholderUrl(configuredUrl)) {
    return configuredUrl.replace(/\/+$/, "");
  }

  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000,
  timeoutErrorMessage: "The request took too long. Please try again.",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;