/// <reference types="vite/client" />

import type { ImportMetaEnv } from 'vite/types/importMeta'

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, never>
  export default component
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

declare module 'qs'
