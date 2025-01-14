import request from '@/axios'
import type { SearchRequest } from '@/apis/search/request'
import type { SearchResponse } from '@/apis/search/response'

export const search = (data: SearchRequest): Promise<SearchResponse> => {
  return request.post({ url: '/search', data: data })
}
