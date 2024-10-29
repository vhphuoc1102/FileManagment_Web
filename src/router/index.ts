
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
