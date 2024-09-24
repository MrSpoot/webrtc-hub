import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null, // Initialement aucun utilisateur connecté
  setUser: (user) => set({ user }), // Définit l'utilisateur
  clearUser: () => set({ user: null }), // Supprime l'utilisateur
}));
