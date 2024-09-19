import { apiCall } from "@/lib/axios";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
  firstname: string;
  lastname: string;
}

export interface RegisterDataResponse extends RegisterData {
  id: number;
}

export interface AuthResponse {
  token: string;
}

export const authService = {
  login: (data: LoginData) => apiCall<string>("post", "/auth/signin", data),

  register: (data: RegisterData) =>
    apiCall<RegisterDataResponse>("post", "/auth/signup", data),

  logout: () => apiCall<void>("post", "/auth/signout"),
};
