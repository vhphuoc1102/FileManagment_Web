import request from '@/axios'
import type { AddShareRequest } from '@/apis/share/request'
import type { AddShareResponse } from '@/apis/share/response'

export const share = (data: AddShareRequest): Promise<AddShareResponse> => {
  return request.post({ url: '/share', data: data })
}
