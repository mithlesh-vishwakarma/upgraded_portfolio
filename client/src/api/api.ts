import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL || "https://api.ordinarycoder.com/api";

// Normalize API_URL: remove trailing slashes, and ensure it ends with /api
API_URL = API_URL.replace(/\/+$/, "");
if (!API_URL.endsWith("/api")) {
  API_URL = API_URL + "/api";
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      const isAdminAuthPage =
        window.location.pathname.startsWith("/admin/login") ||
        window.location.pathname.startsWith("/admin/forgot-password");

      if (!isAdminAuthPage) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
