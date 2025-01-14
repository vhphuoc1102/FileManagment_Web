export interface AuthResponse {
  accessToken: string,
  expireAt: Date,
  refreshToken: string
}

export interface UserInfoResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
