import axios, { AxiosError } from 'axios'
import { defaultRequestInterceptors, defaultResponseInterceptors } from './config'
import * as toast from '@/composables/toast'
import type { AxiosInstance, AxiosResponse, CommonError, RequestConfig } from './types'
import { REQUEST_TIMEOUT } from '@/constants'
import { useUserStoreWithOut } from '@/stores/modules/user'
import router from '@/router'

export const PATH_URL = import.meta.env.VITE_API_BASE_PATH
const UNKNOWN_ERROR = 'Unknown error'
const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: PATH_URL
})

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || ''
    abortControllerMap.delete(url)
    return res
  },
  async (error: AxiosError<CommonError>) => {
    console.log('err： ' + error) // for debug
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      const userStore = useUserStoreWithOut()
      userStore.logout()
      toast.error('Error', 'Session timeout')
      await router.push('/login')
    } else {
      toast.error('Error', error?.response?.data?.message || UNKNOWN_ERROR)
    }
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(defaultRequestInterceptors)
axiosInstance.interceptors.response.use(defaultResponseInterceptors)

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }

      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, controller] of abortControllerMap) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service
