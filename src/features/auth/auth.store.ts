// features/auth/store/auth.store.ts
import { create } from "zustand";
import type { User } from "./types";


type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));