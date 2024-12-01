import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import PlainLayout from '@/layouts/plain/PlainLayout.vue'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/MainPage.vue'),
    meta: {
      title: 'Main',
      layout: MainLayout
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      title: 'Login',
      layout: PlainLayout
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: {
      title: 'Signup',
      layout: PlainLayout
    }
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('@/views/storage/StoragePage.vue'),
    meta: {
      title: 'Storage',
      layout: MainLayout
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue'),
    meta: {
      title: 'Home',
      layout: MainLayout
    }
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import('@/views/location/LocationPage.vue'),
    meta: {
      title: 'Location',
      layout: MainLayout
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
