import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import PlainLayout from '@/layouts/plain/PlainLayout.vue'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
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
    meta: {
      title: 'Storage',
      layout: MainLayout
    },
    children: [
      {
        path: '',
        name: 'Root',
        component: () => import('@/views/storage/StoragePage.vue')
      },
      {
        path: ':id',
        name: 'Child',
        component: () => import('@/views/storage/StoragePage.vue'),
        meta: {
          title: 'Storage',
          layout: MainLayout
        }
      }
    ]
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import('@/views/location/LocationPage.vue'),
    meta: {
      title: 'Location',
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
    path: '/album',
    name: 'Album',
    component: () => import('@/views/album/AlbumPage.vue'),
    meta: {
      title: 'Album',
      layout: MainLayout
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404Page.vue')
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
