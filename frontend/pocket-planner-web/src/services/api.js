import axios from "axios";

const api = axios.create({
  baseURL: "https://backup-1-ncmr.onrender.com/api",
});

export default api;