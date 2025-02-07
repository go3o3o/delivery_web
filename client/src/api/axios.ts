import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_HOST,
  withCredentials: true,
});

export default axiosInstance;
