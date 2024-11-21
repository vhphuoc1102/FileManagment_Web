import { defineStore } from 'pinia'
import { store } from '@/stores'

interface SettingState {
  navBarVisible: boolean
}

export const useSettingStore = defineStore('setting', {
  state: () : SettingState => {
    return {
      navBarVisible: true,
    }
  },
  getters: {
    getNavBarVisible(): boolean {
      return this.navBarVisible;
    }
  },
  actions: {
    setNavBarVisible(visible: boolean): void {
      this.navBarVisible = visible;
    },
    toggleNavBarVisible(): void {
      this.navBarVisible = !this.navBarVisible;
    }
  }
})

export const useSettingStoreWithOut = () => {
  return useSettingStore(store);
}
