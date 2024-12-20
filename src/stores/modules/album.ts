import type { AlbumInfo } from '@/types/album'
import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { GetAlbumsResponse } from '@/apis/album/response'

export interface AlbumFileWithStatus {
  albumInfo: AlbumInfo
  activated: boolean
}

interface AlBumState {
  activatedAlbums: Array<number>,
  albumFiles: Array<AlbumFileWithStatus>,
  breadcrumbs: Array<AlbumInfo>,
  albums: GetAlbumsResponse,
  albumId?: number
}

export const useAlbumStore = defineStore('album', {
  state: (): AlBumState => {
    return {
      activatedAlbums: [],
      albumFiles: [],
      breadcrumbs: [],
      albums: {
        albums: new Map()
      },
      albumId: undefined
    }
  },
  getters: {
    getActivatedAlbums(): Array<number> {
      return this.activatedAlbums
    },
    getBreadcrumbs(): Array<AlbumInfo> {
      return this.breadcrumbs
    },
    getAlbumFiles(): Array<AlbumFileWithStatus> {
      return this.albumFiles
    },
    getAlbums(): GetAlbumsResponse {
      return this.albums
    },
    getAlbumId(): number | undefined {
      return this.albumId
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
    clearActivatedAlbumFiles(): void {
      this.getAlbumFiles.forEach(file => file.activated = false)
    },
    setBreadcrumbs(breadcrumbs: Array<AlbumInfo>): void {
      this.breadcrumbs = breadcrumbs
    },
    addBreadcrumb(breadcrumb: AlbumInfo): void {
      this.breadcrumbs.push(breadcrumb)
    },
    clearBreadcrumbs(): void {
      this.breadcrumbs = []
    },
    setAlbums(albums: GetAlbumsResponse): void {
      this.albums = albums
    },
    setAlbumId(albumId: number | undefined): void {
      this.albumId = albumId
    }
  }
})

export const useAlbumStoreWithOut = () => {
  return useAlbumStore(store)
}
