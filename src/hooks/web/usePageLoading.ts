import { useAppStoreWithOut } from '@/stores/modules/app'

export const usePageLoading = () => {
  const loadingStart = () => {
    const appStore = useAppStoreWithOut()
    appStore.setPageLoading(true)
  }

  const loadingDone = () => {
    const appStore = useAppStoreWithOut()
    appStore.setPageLoading(false)
  }

  return {
    loadingStart,
    loadingDone
  }
}
