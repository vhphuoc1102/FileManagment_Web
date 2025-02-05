import type { RawAxiosRequestHeaders } from 'axios'

declare global {
  declare type Nullable<T> = T | null
  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>
  declare type AxiosContentType =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'

  declare interface ImportMetaEnv {
    readonly VITE_API_BASE_PATH: string
    readonly VITE_BASE_PATH: string
    readonly VITE_NODE_ENV: string
    readonly VITE_MAPBOX_ACCESS_TOKEN: string
  }

  declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'
  declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

  declare interface AxiosConfig {
    params?: any
    data?: any
    url?: string
    method?: AxiosMethod
    headers?: RawAxiosRequestHeaders
    responseType?: AxiosResponseType
  }

  declare interface IResponse<T = any> {
    code: number
    data: T extends any ? T : T & any
  }
}
export {} // Add to expose types
