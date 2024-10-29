declare global {
  declare type Nullable<T> = T | null

  declare interface ImportMetaEnv {
    readonly VITE_API_BASE_PATH: string
    readonly VITE_BASE_PATH: string
    readonly VITE_NODE_ENV: string
  }
}
export { } // Add to expose types
