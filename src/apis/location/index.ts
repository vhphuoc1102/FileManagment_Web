import request from '@/axios'
import type { GetLocationResponse } from '@/apis/location/response'

export const getLocations = (): Promise<Array<GetLocationResponse>> => {
  return request.get({ url: '/file/locations' })
}
