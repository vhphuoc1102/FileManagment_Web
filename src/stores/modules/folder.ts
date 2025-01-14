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
      breadcrumbs: localStorage.getItem('breadcrumbs') ? JSON.parse(localStorage.getItem('breadcrumbs') as string) : [],
      parentDirectoryId: localStorage.getItem('parentDirectoryId') ? parseInt(localStorage.getItem('parentDirectoryId') as string) : -1
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
    persistParentIdToLocalStorage() {
      localStorage.setItem('parentDirectoryId', this.parentDirectoryId?.toString() as string)
    },
    persistBreadcrumbsToLocalStorage() {
      localStorage.setItem('breadcrumbs', JSON.stringify(this.breadcrumbs))
    },
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
      this.persistBreadcrumbsToLocalStorage()
    },
    addBreadcrumb(breadcrumb: FolderInfo): void {
      this.breadcrumbs.push(breadcrumb)
      this.persistBreadcrumbsToLocalStorage()
    },
    setParentDirectoryId(parentDirectoryId: number): void {
      this.parentDirectoryId = parentDirectoryId
      this.persistParentIdToLocalStorage()
    },
    setRoot(): void {
      this.parentDirectoryId = -1
      this.persistParentIdToLocalStorage()
    }
  }
})

export const useFolderStoreWithOut = () => {
  return useFolderStore(store)
}
