import { defineStore } from 'pinia'
import { store } from '@/stores'

interface UserState {
  email?: string;
  tokenKey: string;
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      email: undefined,
      tokenKey: 'Bearer ',
      token: undefined
    }
  },
  getters: {
    getEmail(): string | undefined {
      return this.email;
    },
    getTokenKey(): string {
      return this.tokenKey;
    },
    getToken(): string| undefined {
      return this.token;
    }
  },
  actions: {
    setEmail(email: string) {
      this.email = email;
    },
    setToken(token: string) {
      this.token = token;
    },
    logoutConfirm() {

    },
    reset() {

    },
    logout() {

    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store);
}
