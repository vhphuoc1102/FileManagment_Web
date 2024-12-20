import request from '@/axios'
import type { AddDirectoryRequest, GetDirectoriesParam } from '@/apis/directory/request'
import type { FolderInfo } from '@/types/file'

export const addDirectory = (params: AddDirectoryRequest) => {
  return request.post({ url: '/directory', params: params })
}

export const updateDirectory = (directoryId: number, name: string) => {
  return request.put({ url: `/directory/${directoryId}/name`, data: { name: name } })
}

export const getDirectories = (params: GetDirectoriesParam): Promise<FolderInfo[]> => {
  return request.get({ url: '/directory/list', params: params })
}
