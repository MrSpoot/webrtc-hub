import api from "@/lib/axios";

export interface Profile {
  id: number;
  username: string;
  email: string;
  friends: UserFriend[];
}

export interface UserFriend {
  id: number;
  user: Profile;
  friend: Profile;
  accepted: boolean;
}

export const getUserInfo = (email?: string): Promise<Profile> => {
  return api
    .get(`/users/profile?email=${email}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getUserFriends = (): Promise<UserFriend[]> => {
  return api
    .get(`/users/friends`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const addNewFriend = (friendId?: number): Promise<UserFriend> => {
  return api
    .post(`/users/friends?friendId=${friendId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
