import request from '@/axios'
import type { AddShareRequest, GetShareRequest } from '@/apis/share/request'
import type { AddShareResponse, GetShareResponse } from '@/apis/share/response'

export const share = (data: AddShareRequest): Promise<AddShareResponse> => {
  return request.post({ url: '/share', data: data })
}

export const getShare = (data: GetShareRequest): Promise<GetShareResponse> => {
  return request.post({ url: '/share/detail', data: data })
}
