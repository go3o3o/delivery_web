import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_HOST || "http://localhost:3030",
  withCredentials: true,
});

export default axiosInstance;
