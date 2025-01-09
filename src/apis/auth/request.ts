export interface AuthRequest {
  email: string,
  password: string
}

export interface RefreshRequest {
  refreshToken: string
}

export interface UpdateInfoRequest {
  lastName: string,
  firstName: string,
  username: string,
}
