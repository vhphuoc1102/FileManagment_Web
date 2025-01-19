import type { AuthRequest, RefreshRequest, UpdateInfoRequest } from '@/apis/auth/request'
import type { AuthResponse, UserInfoResponse } from '@/apis/auth/response'
import request from '@/axios'

export const loginApi = (data: AuthRequest): Promise<AuthResponse> => {
  return request.post({ url: '/auth/login', data })
}

export const logoutApi = (): Promise<void> => {
  return request.post({ url: '/auth/logout' })
}

export const registerApi = (data: AuthRequest): Promise<void> => {
  return request.post({ url: '/auth/register', data })
}

export const refreshApi = (data: RefreshRequest): Promise<void> => {
  return request.post({ url: '/auth/refresh', data })
}

export const getMeApi = (): Promise<UserInfoResponse> => {
  return request.get({ url: '/auth/me' })
}

export const updateInfo = (data: UpdateInfoRequest): Promise<void> => {
  return request.put({ url: '/auth/info', data })
}
