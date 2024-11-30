import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { FolderInfo } from '@/types/file'


interface FolderState {
  activatedFolders: Array<number>
  breadcrumbs: Array<FolderInfo>
}

export const useFolderStore = defineStore('folder', {
  state: (): FolderState => {
    return {
      activatedFolders: [],
      breadcrumbs: []
    }
  },
  getters: {
    getActivatedFolders(): Array<number> {
      return this.activatedFolders
    },
    getBreadcrumbs(): Array<FolderInfo> {
      return this.breadcrumbs
    }
  },
  actions: {
    setActivatedFolders(folders: Array<number>): void {
      this.activatedFolders = folders
    },
    addActivatedFolder(folder: number): void {
      this.activatedFolders.push(folder)
    },
    removeActivatedFolder(folder: number): void {
      this.activatedFolders = this.activatedFolders.filter((item) => item !== folder)
    },
    clearActivatedFolders(): void {
      this.activatedFolders = []
    },
    setBreadcrumbs(breadcrumbs: Array<FolderInfo>): void {
      this.breadcrumbs = breadcrumbs
    },
    addBreadcrumb(breadcrumb: FolderInfo): void {
      this.breadcrumbs.push(breadcrumb)
    }
  }
})

export const useFolderStoreWithOut = () => {
  return useFolderStore(store)
}
