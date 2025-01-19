import request from '@/axios'
import type { CreateAlbumRequest, DeleteAlbumRequest, UpdateAlbumRequest } from '@/apis/album/request'
import type { FilterParams } from '@/apis/common/type'
import type { GetAlbumsResponse } from '@/apis/album/response'

export const createAlbum = (data: CreateAlbumRequest) => {
  return request.post({ url: '/album', data: data })
}

export const updateAlbum = (albumId: number, data: UpdateAlbumRequest) => {
  return request.put({ url: `/album/${albumId}`, data: data })
}

export const getAlbums = (data: FilterParams): Promise<GetAlbumsResponse> => {
  return request.post({ url: '/album/list', data: data })
}

export const deleteAlbum = (data: DeleteAlbumRequest): Promise<void> => {
  return request.delete({ url: '/album', data: data })
}
