import api from "@/lib/axios";

export interface Profile {
  id: number;
  username: string;
  email: string;
}

export const getUserInfo = (): Promise<Profile> => {
  return api
    .get("/users/profile")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
