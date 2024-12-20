import { defineStore } from 'pinia'
import { store } from '@/stores'

interface FileState {
  activatedFiles: Array<number>,
  activatedFolderFiles: Array<number>,
  activatedAlbumFiles: Array<number>
}

export const useFileStore = defineStore('file', {
  state: (): FileState => {
    return {
      activatedFiles: [],
      activatedFolderFiles: [],
      activatedAlbumFiles: []
    }
  },
  getters: {
    getActivatedFiles(): Array<number> {
      return this.activatedFiles
    },
    getActivatedFolderFiles(): Array<number> {
      return this.activatedFolderFiles
    },
    getActivatedAlbumFiles(): Array<number> {
      return this.activatedAlbumFiles
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
    },
    setActivatedFolderFiles(files: Array<number>): void {
      this.activatedFolderFiles = files
    },
    addActivatedFolderFile(file: number): void {
      this.activatedFolderFiles.push(file)
    },
    removeActivatedFolderFile(file: number): void {
      this.activatedFolderFiles = this.activatedFolderFiles.filter((item) => item !== file)
    },
    clearActivatedFolderFiles(): void {
      this.activatedFolderFiles = []
    },
    setActivatedAlbumFiles(files: Array<number>): void {
      this.activatedAlbumFiles = files
    },
    addActivatedAlbumFile(file: number): void {
      this.activatedAlbumFiles.push(file)
    },
    removeActivatedAlbumFile(file: number): void {
      this.activatedAlbumFiles = this.activatedAlbumFiles.filter((item) => item !== file)
    },
    clearActivatedAlbumFiles(): void {
      this.activatedAlbumFiles = []
    }
  }
})

export const useFileStoreWithOut = () => {
  return useFileStore(store)

}
