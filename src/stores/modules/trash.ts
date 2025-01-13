import { defineStore } from 'pinia'
import { store } from '@/stores'

interface TrashState {
  activatedTrashFiles: Array<number>,
}

export const useTrashStore = defineStore('trash', {
  state: (): TrashState => {
    return {
      activatedTrashFiles: []
    }
  },
  getters: {
    getActivatedTrashFiles(): Array<number> {
      return this.activatedTrashFiles
    }
  },
  actions: {
    setActivatedTrashFiles(files: Array<number>): void {
      this.activatedTrashFiles = files
    },
    addActivatedTrashFile(file: number): void {
      this.activatedTrashFiles.push(file)
    },
    removeActivatedTrashFile(file: number): void {
      this.activatedTrashFiles = this.activatedTrashFiles.filter((item) => item !== file)
    },
    clearActivatedTrashFiles(): void {
      this.activatedTrashFiles = []
    }
  }
})

export const useTrashStoreWithOut = () => {
  return useTrashStore(store)
}
