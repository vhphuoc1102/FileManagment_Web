import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface RequestInterceptors<T> {
  // Request interceptor
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: never) => never
  // Response interceptor
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: never) => never
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

interface CommonError {
  code: string,
  debug: string,
  httpStatus: number,
  message: string,
  module: string,
  timestamp: string
}

export type {
  AxiosResponse,
  RequestInterceptors,
  RequestConfig,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosError,
  CommonError
}
