import { create } from "zustand";
import { persist } from "zustand/middleware";

type Session = {
  fullName: string;
  token: string;
};

type State = {
  create: (i: Session) => void;
  destroy: () => void;
  session?: Session;
};

export const useSessionStore = create<State>()(
  persist(
    (set) => ({
      create: (i) => set({ session: i }),
      destroy: () => set({ session: undefined }),
      session: undefined,
    }),
    { name: "session-store" },
  ),
);
