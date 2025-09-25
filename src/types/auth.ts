// src/types/auth.ts

// 用户登录接口
export interface UserLogin {
  username: string
  password: string
}

// 用户响应接口
export interface UserResponse {
  id: number
  username: string
  email: string
  full_name: string | null
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

// 令牌接口
export interface Token {
  access_token: string
  token_type: string
  expires_in: number
}

// 认证响应接口
export interface AuthResponse {
  user: UserResponse
  token: Token
  message: string
}

// 用户注册接口
export interface UserCreate {
  username: string
  email: string
  full_name?: string
  password: string
  confirm_password: string
}

// 用户资料更新接口
export interface UserProfileUpdate {
  full_name?: string
  email?: string
}

// 健康检查响应接口
export interface HealthCheckResponse {
  message: string
}