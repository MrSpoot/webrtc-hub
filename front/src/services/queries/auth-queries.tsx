import { useMutation } from "@tanstack/react-query";
import {
  login,
  LoginData,
  logout,
  register,
  RegisterData,
} from "../authentication-service";

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginData) => login(data),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterData) => register(data),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => logout(),
  });
