import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialAuth = { token: null, user: null };

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialAuth,
      login: (token, user) => set({ token, user }),
      logout: () => set(initialAuth),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-store",
      version: 1,
      partialize: (state) => ({ token: state.token, user: state.user }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
