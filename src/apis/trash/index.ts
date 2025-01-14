import request from '@/axios'
import type { TrashRequest } from '@/apis/trash/request'

export const restore = (data: TrashRequest): Promise<void> => {
  return request.put({ url: '/trash/restore', data: data })
}

export const deleteTrash = (data: TrashRequest): Promise<void> => {
  return request.delete({ url: '/trash', data: data })
}
