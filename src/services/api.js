import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "";

export const apiClient = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  fetchfavorites() {
    return apiClient.get("/user/favorites");
  },
  updateFavorites() {
    return apiClient.post("/user/favorites", {
      characters: JSON.parse(localStorage.getItem("favoritesCharacters")),
      comics: JSON.parse(localStorage.getItem("favoritesComics")),
    });
  },
};
