import { AUTH_API_ENDPOINTS } from "../config/api/auth.api";
import axios from "../config/axios.config";

import { UserCreationDto } from "../models/dto/user-creation.dto";
import { UserLoginDto } from "../models/dto/user-login.dto";

const signUp = (user: UserCreationDto): Promise<any> => {
  return axios.post(AUTH_API_ENDPOINTS.REGISTER, user);
};

const signIn = (login: UserLoginDto): Promise<any> => {
  return axios.post(AUTH_API_ENDPOINTS.LOGIN, login);
};

const authService = {
  signIn,
  signUp,
};

export default authService;
