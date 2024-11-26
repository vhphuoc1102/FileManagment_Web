import { defineStore } from 'pinia'
import { store } from '@/stores'

interface SettingState {
  sideBarVisible: boolean
}

export const useSettingStore = defineStore('setting', {
  state: () : SettingState => {
    return {
      sideBarVisible: true,
    }
  },
  getters: {
    getSideBarVisible(): boolean {
      return this.sideBarVisible;
    }
  },
  actions: {
    setSideBarVisible(visible: boolean): void {
      this.sideBarVisible = visible;
    },
    toggleSideBarVisible(): void {
      this.sideBarVisible = !this.sideBarVisible;
    }
  }
})

export const useSettingStoreWithOut = () => {
  return useSettingStore(store);
}
