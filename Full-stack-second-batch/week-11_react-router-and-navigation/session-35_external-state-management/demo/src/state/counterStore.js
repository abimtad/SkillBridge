import { create } from "zustand";

const initial = { count: 0 };

export const useCounterStore = create((set) => ({
  ...initial,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set(initial),
}));
