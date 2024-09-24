import axios, { AxiosError, AxiosResponse } from "axios";
import { handleHttpError } from "./handle-error";
import { ErrorResponse } from "./utils";

declare module "axios" {
  export interface AxiosRequestConfig {
    silent?: boolean;
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<unknown>) => response,
  (error: AxiosError<AxiosResponse<ErrorResponse>>) => {
    handleHttpError(error);
    return Promise.reject(error);
  }
);

export default api;
