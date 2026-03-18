import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      isUserLogged: false,
      showAuthModal: false,
      setIsUserLogged: (value) => set({ isUserLogged: value }),
      openAuthModal: () => set({ showAuthModal: true }),
      closeAuthModal: () => set({ showAuthModal: false }),
    }),
    { name: 'user-store' },
  ),
)

