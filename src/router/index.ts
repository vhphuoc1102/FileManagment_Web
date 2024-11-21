import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/MainPage.vue'),
    meta: {
      title: 'Main',
      layout: 'MainLayout'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      title: 'Login',
      layout: 'LoginLayout'
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: {
      title: 'Signup',
      layout: 'RegisterLayout'
    }
  },
  {
    path: '/file',
    name: 'File',
    component: () => import('@/views/file/FilePage.vue'),
    meta: {
      title: 'File',
      layout: 'MainLayout'
    }
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
