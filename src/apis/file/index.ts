import request from '@/axios'
import type {
  DownloadFileRequest,
  GetFileGroupsParam,
  GetFilesParam,
  GetMetaParam,
  MoveToTrashParam
} from '@/apis/file/request'
import type { GetFileGroupResponse, GetFileMetaDataResponse, GetFilesResponse } from '@/apis/file/response'
import type { AxiosResponse } from 'axios'

export const getFileGroups = (param: GetFileGroupsParam): Promise<Array<GetFileGroupResponse>> => {
  return request.get({ url: '/file/groups', params: param })
}

export const uploadFile = (data: Recordable): Promise<void> => {
  return request.post({ url: '/file/upload-chunk', data: data, headers: { 'Content-Type': 'multipart/form-data' } })
}

export const downloadFile = (data: DownloadFileRequest): Promise<AxiosResponse<Blob>> => {
  return request.post({ url: '/file/download', data: data, responseType: 'blob' })
}

export const getFiles = (param: GetFilesParam): Promise<Array<GetFilesResponse>> => {
  return request.get({ url: '/file/list', params: param })
}

export const getMeta = (param: GetMetaParam): Promise<GetFileMetaDataResponse> => {
  return request.get({ url: '/file/meta', params: param })
}

export const moveToTrash = (param: MoveToTrashParam): Promise<void> => {
  return request.post({ url: '/file/trash', data: param })
}
