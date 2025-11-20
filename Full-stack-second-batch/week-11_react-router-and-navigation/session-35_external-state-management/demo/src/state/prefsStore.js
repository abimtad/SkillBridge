import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialPrefs = { theme: "light", sidebarOpen: true };

export const usePrefsStore = create(
  persist(
    (set) => ({
      ...initialPrefs,
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      reset: () => set(initialPrefs),
    }),
    {
      name: "prefs-store",
      partialize: (state) => ({ theme: state.theme }), // persist only theme
    }
  )
);
