import { useAppStoreWithOut } from '@/stores/modules/app'

export const usePageLoading = () => {
  const loadStart = () : void => {
    const appStore = useAppStoreWithOut()
    appStore.setPageLoading(true)
  }

  const loadDone = () : void => {
    const appStore = useAppStoreWithOut()
    appStore.setPageLoading(false)
  }

  return {
    loadStart,
    loadDone
  }
}
