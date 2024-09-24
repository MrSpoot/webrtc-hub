import api from "@/lib/axios";
import { Profile } from "./userService";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  firstname: string;
  lastname: string;
  email: string;
}

export interface RegisterDataResponse extends RegisterData {
  id: number;
}

export interface AuthResponse {
  token: string;
  user: Profile;
}

export const login = (data: LoginData): Promise<AuthResponse> => {
  return api
    .post("/auth/signin", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const register = (data: RegisterData): Promise<string> => {
  return api.post("/auth/signup", data).then((response) => response.data);
};

export const logout = (): Promise<string> => {
  return api.post("/auth/signout").then((response) => response.data);
};
