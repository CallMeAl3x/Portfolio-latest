import { create } from "zustand";

// forward = accueil vers projet, backward = projet vers accueil, switch = projet suivant
export type TransitionDirection = "forward" | "backward" | "switch" | null;

interface TransitionState {
  direction: TransitionDirection;
  setDirection: (dir: TransitionDirection) => void;
}

export const usePageAnimationStore = create<TransitionState>((set) => ({
  direction: null,
  setDirection: (dir) => set({ direction: dir })
}));
