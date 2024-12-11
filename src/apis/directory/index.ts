import request from '@/axios'
import type { AddDirectoryRequest } from '@/apis/directory/request'

export const addDirectory = (params: AddDirectoryRequest) => {
  return request.post({ url: '/directory', params: params})
}

export const updateDirectory = (directoryId: number, name: string) => {
  return request.put({url: `/directory/${directoryId}/name`, data: { name: name }})
}
