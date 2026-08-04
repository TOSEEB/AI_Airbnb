import axios from "axios";

const isPlaceholderUrl = (value) => {
  return !value || value.includes("your-backend-url") || value.includes("YOUR_BACKEND_URL");
};

const getBaseURL = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl && !isPlaceholderUrl(configuredUrl)) {
    return configuredUrl;
  }

  if (import.meta.env.PROD) {
    return `${window.location.origin}/api`;
  }

  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
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