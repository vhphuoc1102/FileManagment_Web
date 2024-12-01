import { defineStore } from 'pinia'
import { store } from '@/stores'

interface AppState {
  pageLoading: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      pageLoading: false
    }
  },
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    }
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
