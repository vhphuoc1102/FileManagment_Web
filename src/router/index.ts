import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import UserLayout from '@/layouts/user/UserLayout.vue'
import UserInfoPage from '@/views/user/UserInfoPage.vue'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/storage',
    name: 'Storage',
    component: MainLayout,
    meta: {
      title: 'Storage'
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
        component: () => import('@/views/storage/StoragePage.vue')
      }
    ]
  },
  {
    path: '/location',
    name: 'Location',
    component: MainLayout,
    meta: {
      title: 'Location'
    }, children: [
      {
        path: '',
        component: () => import('@/views/location/LocationPage.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: MainLayout,
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/home/HomePage.vue')
      }
    ]
  },
  {
    path: '/album',
    name: 'Album',
    component: MainLayout,
    meta: {
      title: 'Album'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/album/AlbumPage.vue')
      },
      {
        path: ':id/file',
        name: 'Child',
        component: () => import('@/views/album/AlbumPage.vue')
      }
    ]
  },
  {
    path: '/shared',
    name: 'SharedWithMe',
    component: MainLayout,
    meta: {
      title: 'Shared With Me'
    },
    children: [
      {
        path: '/shared-with-me',
        name: 'Shared with me',
        component: () => import('@/views/shared/SharedWithMePage.vue')
      },
      {
        path: '/sharing',
        name: 'Sharing',
        component: () => import('@/views/shared/SharingPage.vue')
      }
    ]
  },
  {
    path: '/404',
    name: 'Not Found',
    component: () => import('@/views/error/404Page.vue')
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'User Info',
        component: UserInfoPage
      }
    ]
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
