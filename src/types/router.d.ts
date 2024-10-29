import type { RouteRecordRaw } from "vue-router"
import type { Component } from 'vue'

interface RouteMetaCustom extends Record<string | number | symbol, unknown> {
  title?: string
  permission?: string
  layout?: string
}

declare module 'vue-router' {}

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    name: string
    meta?: RouteMetaCustom
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw
    extends Omit<RouteRecordRaw, 'meta' | 'component' | 'children'> {
    name: string
    meta: RouteMetaCustom
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }
}
