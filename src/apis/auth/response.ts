export interface AuthResponse {
  accessToken: string,
  expireAt: Date,
  refreshToken: string
}

export interface UserInfoResponse {
  userId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
