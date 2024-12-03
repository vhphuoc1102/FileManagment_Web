import type { AlbumInfo } from '@/types/album'
import { defineStore } from 'pinia'
import { store } from '@/stores'

interface AlBumState {
  activatedAlbums: Array<number>
  breadcrumbs: Array<AlbumInfo>
}

export const useAlbumStore = defineStore('album', {
  state: (): AlBumState => {
    return {
      activatedAlbums: [],
      breadcrumbs: []
    }
  },
  getters: {
    getActivatedAlbums(): Array<number> {
      return this.activatedAlbums
    },
    getBreadcrumbs(): Array<AlbumInfo> {
      return this.breadcrumbs
    }
  },
  actions: {
    setActivatedAlbums(albums: Array<number>): void {
      this.activatedAlbums = albums
    },
    addActivatedAlbum(album: number): void {
      this.activatedAlbums.push(album)
    },
    removeActivatedAlbum(album: number): void {
      this.activatedAlbums = this.activatedAlbums.filter((item) => item !== album)
    },
    clearActivatedAlbums(): void {
      this.activatedAlbums = []
    },
    setBreadcrumbs(breadcrumbs: Array<AlbumInfo>): void {
      this.breadcrumbs = breadcrumbs
    },
    addBreadcrumb(breadcrumb: AlbumInfo): void {
      this.breadcrumbs.push(breadcrumb)
    }
  }
})

export const useAlbumStoreWithOut = () => {
  return useAlbumStore(store)
}
