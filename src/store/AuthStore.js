import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      role: null,

      setAuthData: (token, role) => {
        set({
          isAuthenticated: true,
          token,
          role,
        });
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, role: null });
      },
    }),
    {
      name: 'auth',
      getStorage: () => localStorage,
    }
  )
);


export default useAuthStore;
