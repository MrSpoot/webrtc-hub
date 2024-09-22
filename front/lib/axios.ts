import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { handleHttpError } from "./handle-error";
import { ErrorResponse } from "./utils";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
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

export const apiCall = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api({ method, url, data, ...config });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};

export default api;
