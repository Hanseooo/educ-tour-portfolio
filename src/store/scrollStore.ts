import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ScrollState {
  scrollY: number;
  velocity: number;
  lastY: number;
  lastTime: number;
  setScrollY: (y: number) => void;
}

export const useScrollStore = create<ScrollState>()(
  subscribeWithSelector((set, get) => ({
    scrollY: 0,
    velocity: 0,
    lastY: 0,
    lastTime: performance.now(),

    setScrollY: (y: number) => {
      const { lastY, lastTime } = get();
      const now = performance.now();

      const deltaY = y - lastY;
      const deltaTime = now - lastTime || 1;
      const velocity = deltaY / deltaTime;

      set({
        scrollY: y,
        velocity,
        lastY: y,
        lastTime: now,
      });
    },
  }))
);
