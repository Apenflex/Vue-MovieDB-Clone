import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    isUserLogged: false,
    showAuthModal: false,
  }),
  persist: {
    enabled: true,
  },
})