import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { FolderInfo } from '@/types/file'


interface FolderState {
  activatedFolders: Array<number>
  breadcrumbs: Array<FolderInfo>,
  parentDirectoryId?: number
}

export const useFolderStore = defineStore('folder', {
  state: (): FolderState => {
    return {
      activatedFolders: [],
      breadcrumbs: [],
      parentDirectoryId: undefined
    }
  },
  getters: {
    getActivatedFolders(): Array<number> {
      return this.activatedFolders
    },
    getBreadcrumbs(): Array<FolderInfo> {
      return this.breadcrumbs
    },
    getParentDirectoryId(): number | undefined {
      return this.parentDirectoryId
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
    },
    setParentDirectoryId(parentDirectoryId: number): void {
      this.parentDirectoryId = parentDirectoryId
    }
  }
})

export const useFolderStoreWithOut = () => {
  return useFolderStore(store)
}
