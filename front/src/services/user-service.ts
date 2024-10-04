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

export const getUserProfilesById = (ids: number[]): Promise<Profile[]> => {
  return api
    .post(`/users/profiles/by-ids`, ids)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getUserProfile = (id: number): Promise<Profile> => {
  return api
    .get(`/users/profile/${id}`)
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

export const reponseToFriendRequest = (
  id: number,
  valid: boolean
): Promise<UserFriend> => {
  return api
    .post(`/users/friends/${id}/respond?accepted=${valid}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
