import router from '@/router'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { useFileStoreWithOut } from '@/stores/modules/file'
import { useFolderStoreWithOut } from '@/stores/modules/folder'

const { loadStart, loadDone } = usePageLoading()
const NO_REDIRECT_WHITE_LIST = ['/top', '/login', '/signup', /^\/image\/[^/]+$/]

router.beforeEach(async (to, from, next) => {
  loadStart()
  const userStore = useUserStoreWithOut()
  if (userStore.getUserInfo) {
    if (to.path === '/login' || to.path === '/signup') {
      next({ path: '/' })
    } else {
      if (to.path !== '/storage') {
        const fileStore = useFileStoreWithOut()
        const folderStore = useFolderStoreWithOut()
        fileStore.clearActivatedFiles()
        fileStore.clearActivatedFolderFiles()
        folderStore.clearActivatedFolders()
        folderStore.setBreadcrumbs([])
        folderStore.setRoot()
      }

      const redirectPath = from.query.redirect
      if (!redirectPath) {
        next()
      } else {
        const redirect = decodeURIComponent(redirectPath as string)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        next(nextData)
      }
    }
  } else {
    const isWhitelisted = NO_REDIRECT_WHITE_LIST.some(pattern =>
      typeof pattern === 'string' ? pattern === to.path : pattern.test(to.path)
    )
    if (isWhitelisted) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  loadDone()
})
