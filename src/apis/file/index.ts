import request from '@/axios'

export const uploadFile = (data: Recordable): Promise<void> => {
  return request.post({ url: '/file/upload-chunk', data: data, headers: { 'Content-Type': 'multipart/form-data' } })
}

export const downloadFile = () => {
}
