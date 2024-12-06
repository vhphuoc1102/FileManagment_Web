import router from '@/router'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useUserStoreWithOut } from '@/stores/modules/user'
const { loadStart , loadDone } = usePageLoading()
const NO_REDIRECT_WHITE_LIST = ['/login']

router.beforeEach(async (to, from, next) => {
  loadStart()
  // const userStore = useUserStoreWithOut()
  // if (userStore.getUserInfo) {
  //   if (to.path === '/login') {
  //     next({path: '/'})
  //   } else {
  //     const redirectPath = from.query.redirect || to.path
  //     const redirect = decodeURIComponent(redirectPath as string)
  //     const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
  //     next(nextData)
  //   }
  // } else {
  //   if (NO_REDIRECT_WHITE_LIST.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`)
  //   }
  // }
  next()
})
router.afterEach(() => {
  loadDone()
})
