import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthPerisistState {
  token: string | null;
  signIn: (tokens: { token: string }) => void;
  signOut: () => void;
}

export const useAuthPersistStore = create(
  persist<IAuthPerisistState>(
    (set) => ({
      token: null,
      roleName: null,
      signIn: ({ token }) => set({ token }),
      signOut: () => set({ token: null }),
    }),
    {
      name: 'token',
    },
  ),
);
