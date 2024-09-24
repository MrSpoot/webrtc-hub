import api from "@/lib/axios";

export interface Profile {
  id: number;
  username: string;
  email: string;
}

export interface UserFriend {
  id: number;
  user: Profile;
  friend: Profile;
  isAccepted: boolean;
}

export const getUserInfo = (email?: string): Promise<Profile> => {
  return api
    .get(`/users/profile?email=${email}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const addNewFriend = (friendId?: number): Promise<UserFriend> => {
  return api
    .post(`/users/friend?friendId=${friendId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
