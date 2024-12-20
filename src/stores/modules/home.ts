import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { FileInfo } from '@/types/file'

export interface FileInfoWithStatus {
  fileInfo: FileInfo
  activated: boolean
}

export interface FileTimeGroupInfo {
  time: string,
  activatedAll: boolean,
  files: Array<FileInfoWithStatus>
}

interface HomeState {
  fileTimeGroups: Array<FileTimeGroupInfo>
}

export const useHomeStore = defineStore('home', {
  state: (): HomeState => {
    return {
      fileTimeGroups: []
    }
  },
  getters: {
    getFileTimeGroups(): Array<FileTimeGroupInfo> {
      return this.fileTimeGroups
    }
  },
  actions: {
    clearActivatedFiles() {
      this.fileTimeGroups.forEach(fileTimeGroup => {
        fileTimeGroup.activatedAll = false
        fileTimeGroup.files.forEach(file => {
          file.activated = false
        })
      })
    },
    setFileTimeGroups(fileTimeGroups: Array<FileTimeGroupInfo>) {
      this.fileTimeGroups = fileTimeGroups
    }
  }
})

export const useHomeStoreWithOut = () => {
  return useHomeStore(store)
}
