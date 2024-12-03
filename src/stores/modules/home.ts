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
      fileTimeGroups: [{
        time: '2021-09-01',
        activatedAll: false,
        files: [
          {
            fileInfo: {
              name: 'file1',
              fileId: 1,
              image: new File([''], 'file1')
            },
            activated: false
          },
          {
            fileInfo: {
              name: 'file2',
              fileId: 2,
              image: new File([''], 'file2')
            },
            activated: false
          }
        ]
      }]
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
    }
  }
})

export const useHomeStoreWithOut = () => {
  return useHomeStore(store)
}
