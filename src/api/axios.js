import axios from "axios";

const API = axios.create({
  baseURL:
    "https://crochet-store-backend.onrender.com/api",
});

export default API;