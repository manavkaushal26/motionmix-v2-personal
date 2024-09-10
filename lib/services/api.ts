import { signOut } from "@/auth";
import axios from "axios";
import { config } from "../globalConfig";

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.data && error?.response?.data?.logout) {
      return signOut({ redirectTo: "/sign-in" });
    }
    return Promise.reject(error);
  }
);

export default api;
