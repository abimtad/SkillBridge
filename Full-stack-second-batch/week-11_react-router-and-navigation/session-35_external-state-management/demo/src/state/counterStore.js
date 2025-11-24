import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initial = { count: 0, age: 0 };

export const useCounterStore = create(
  persist(
    (set) => ({
      ...initial,
      increment: () => set((s) => ({ count: s.count + 1 })),
      decrement: () => set((s) => ({ count: s.count - 1 })),
      reset: () => set(initial),
    }),
    {
      name: "counter-storage",
      partialize: (state) => ({ ...state }), // only persist count
      storage: createJSONStorage(() => localStorage),
    }
  )
);
