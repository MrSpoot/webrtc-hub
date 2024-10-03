import { UserFriend } from "@/src/services";
import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  friends: UserFriend[] | undefined;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addFriend: (friend: UserFriend) => void;
  addFriends: (friend: UserFriend[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: { ...user } }),
  clearUser: () => set({ user: null }),
  addFriend: (newFriend) =>
    set((state) => {
      if (!state.user) return state;
      const updatedFriends = [...(state.user.friends ?? []), newFriend];
      return { user: { ...state.user, friends: updatedFriends } };
    }),
  addFriends: (newFriends) =>
    set((state) => {
      if (!state.user) return state;
      const updatedFriends = [...(state.user.friends ?? []), ...newFriends];
      return { user: { ...state.user, friends: updatedFriends } };
    }),
}));
