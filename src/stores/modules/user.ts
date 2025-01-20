import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { UserInfo } from '@/apis/auth/types'
import router from '@/router'

interface UserState {
  userInfo?: UserInfo;
  tokenKey: string;
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: undefined,
      tokenKey: 'Authorization',
      token: undefined
    }
  },
  getters: {
    getUserInfo(): UserInfo | undefined {
      return this.userInfo
    },
    getTokenKey(): string {
      return this.tokenKey
    },
    getToken(): string | undefined {
      return this.token
    }
  },
  actions: {
    setUserState(userInfo: UserInfo, token: string) {
      this.setUserInfo(userInfo)
      this.setToken(token)
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setToken(token: string) {
      this.token = token
    },
    reset() {
      this.userInfo = undefined
      this.token = undefined
      router.replace('/login')
    },
    logout() {
      this.reset()
    },
    isAuth() {
      return !!this.token
    },
    isPublic() {
      return !this.token || !this.userInfo
    }
  },
  persist: true
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
