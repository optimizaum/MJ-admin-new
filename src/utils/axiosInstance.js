import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errMessage = error.response?.data?.message;
    const status = error.response?.status;

    if ( 
      errMessage?.toLowerCase().includes("invalid token") ||
      errMessage?.toLowerCase().includes("unauthorized")||
      errMessage?.toLowerCase().includes("expired token")

    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
