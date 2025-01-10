import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import UserLayout from '@/layouts/user/UserLayout.vue'
import UserInfoPage from '@/views/user/UserInfoPage.vue'
import UserDetailLayout from '@/layouts/user/UserDetailLayout.vue'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/top'
  },
  {
    path: '/top',
    component: UserLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/top/TopPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: UserLayout,
    meta: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/auth/LoginPage.vue')
      }
    ]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: UserLayout,
    meta: {
      title: 'Signup'
    }, children: [
      {
        path: '',
        component: () => import('@/views/auth/RegisterPage.vue')
      }
    ]
  },
  {
    path: '/storage',
    name: 'Storage',
    component: UserLayout,
    meta: {
      title: 'Storage'
    },
    children: [
      {
        path: '',
        name: 'Root',
        component: UserDetailLayout,
        children: [
          {
            path: '',
            component: () => import('@/views/storage/StoragePage.vue')
          }
        ]
      },
      {
        path: ':id',
        name: 'Child',
        component: UserDetailLayout,
        children: [
          {
            path: '',
            component: () => import('@/views/storage/StoragePage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/location',
    name: 'Location',
    component: UserLayout,
    meta: {
      title: 'Location'
    }, children: [
      {
        path: '',
        component: UserDetailLayout,
        children: [
          {
            path: '',
            component: () => import('@/views/location/LocationPage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: UserLayout,
    meta: {
      title: 'Home'
    },
    children: [{
      path: '',
      component: UserDetailLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/home/HomePage.vue')
        }
      ]
    }
    ]
  },
  {
    path: '/album',
    name: 'Album',
    component: UserLayout,
    meta: {
      title: 'Album'
    },
    children: [{
      path: '',
      component: UserDetailLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/album/AlbumPage.vue')
        },
        {
          path: ':id/file',
          component: () => import('@/views/album/AlbumPage.vue')
        }
      ]
    }]
  },
  {
    path: '/shared',
    name: 'SharedWithMe',
    component: UserLayout,
    meta: {
      title: 'Shared With Me'
    },
    children: [{
      path: '',
      component: UserDetailLayout,
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
  },
  {
    path: '/user-detail',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'User Detail',
        component: () => import('@/views/user/UserPage.vue')
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
