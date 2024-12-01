import { defineStore } from 'pinia'
import { store } from '@/stores'

interface FileState {
  activatedFiles: Array<number>
}

export const useFileStore = defineStore('file', {
  state: (): FileState => {
    return {
      activatedFiles: []
    }
  },
  getters: {
    getActivatedFiles(): Array<number> {
      return this.activatedFiles
    }
  },
  actions: {
    setActivatedFiles(files: Array<number>): void {
      this.activatedFiles = files
    },
    addActivatedFile(file: number): void {
      this.activatedFiles.push(file)
    },
    removeActivatedFile(file: number): void {
      this.activatedFiles = this.activatedFiles.filter((item) => item !== file)
    },
    clearActivatedFiles(): void {
      this.activatedFiles = []
    }
  }
})

export const useFileStoreWithOut = () => {
  return useFileStore(store)

}
