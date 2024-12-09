import type { AuthRequest } from '@/apis/auth/request'
import type { AuthResponse } from '@/apis/auth/response'
import request from '@/axios'

export const loginApi = (data: AuthRequest): Promise<AuthResponse> => {
  return request.post({ url: '/auth/login', data })
}

export const registerApi = (data: AuthRequest): Promise<void> => {
  return request.post({ url: '/auth/register', data })
}
