import { create } from "zustand";

interface TransitionState {
  direction: "forward" | "backward" | null;
  setDirection: (dir: "forward" | "backward" | null) => void;
}

export const usePageAnimationStore = create<TransitionState>((set) => ({
  direction: null,
  setDirection: (dir) => set({ direction: dir })
}));
