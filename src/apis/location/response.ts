import type { GetFileItemResponse } from '@/apis/file/response'

export interface GetLocationResponse {
  latitude: number,
  longitude: number,
  fileItem: GetFileItemResponse
}
