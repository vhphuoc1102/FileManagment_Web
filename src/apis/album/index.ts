import request from '@/axios'
import type { CreateAlbumRequest, UpdateAlbumRequest } from '@/apis/album/request'
import type { FilterParams } from '@/apis/common/type'

export const createAlbum = (data: CreateAlbumRequest) => {
  return request.post({url: '/album', data: data})
}

export const updateAlbum = (albumId: number, data: UpdateAlbumRequest) => {
  return request.put({url: `/album/${albumId}`, data: data})
}

export const getAlbums = (params: FilterParams) => {
  return request.get({url: '/album', params: params})
}
