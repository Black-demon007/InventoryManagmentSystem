import axios from "axios";

const BASE_URL = "http://localhost:5173/";

export const request = axios.create({
  baseURL:BASE_URL
});