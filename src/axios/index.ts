import service from './service'
import { CONTENT_TYPE } from '@/constants'
import { useUserStoreWithOut } from '@/stores/modules/user'

const request = (option: AxiosConfig) => {
  const { url, method, params, data, headers, responseType } = option

  const userStore = useUserStoreWithOut()
  return service.request({
    url: url,
    method,
    params,
    data: data,
    responseType: responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      [userStore.getTokenKey ?? 'Authorization']: userStore.getToken ?? '',
      ...headers
    }
  })
}

export default {
  get: <T>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<T>
  },
  post: <T>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<T>
  },
  delete: <T>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<T>
  },
  put: <T>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<T>
  }
}
