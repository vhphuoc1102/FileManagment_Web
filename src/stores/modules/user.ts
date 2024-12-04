import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { UserInfo } from '@/apis/auth/types'

interface UserState {
  userInfo?: UserInfo;
  tokenKey: string;
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: undefined,
      tokenKey: 'Bearer ',
      token: undefined
    }
  },
  getters: {
    getUserInfo(): UserInfo | undefined {
      return this.userInfo;
    },
    getTokenKey(): string {
      return this.tokenKey;
    },
    getToken(): string| undefined {
      return this.token;
    }
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
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
