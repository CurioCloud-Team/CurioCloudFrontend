import axios from 'axios'
import type {
  UserLogin,
  AuthResponse,
  UserCreate,
  UserProfileResponse,
  UserProfileUpdate,
  MessageResponse
} from '@/types/auth'

// 重新导出类型，以便其他模块可以从这里导入
export type {
  UserLogin,
  AuthResponse,
  UserCreate,
  UserProfileResponse,
  UserProfileUpdate,
  MessageResponse
} from '@/types/auth'

// API 基础 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// 创建 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：添加认证令牌
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理认证错误
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // 清除本地认证状态，但不自动跳转
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      // 让组件自己处理401错误，不在这里自动跳转
    }
    return Promise.reject(error)
  }
)

// 登录 API
export const loginAPI = async (credentials: UserLogin): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/login', credentials)
  return response.data
}

// 注册 API
export const registerAPI = async (userData: UserCreate): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/register', userData)
  return response.data
}

// 获取用户资料 API
export const getUserProfileAPI = async (): Promise<UserProfileResponse> => {
  const response = await api.get<UserProfileResponse>('/api/user/profile')
  return response.data
}

// 更新用户资料 API
export const updateUserProfileAPI = async (profileData: UserProfileUpdate): Promise<UserProfileResponse> => {
  const response = await api.put<UserProfileResponse>('/api/user/profile', profileData)
  return response.data
}

// 获取用户状态 API
export const getUserStatusAPI = async (): Promise<MessageResponse> => {
  const response = await api.get<MessageResponse>('/api/user/profile/status')
  return response.data
}

// 健康检查 API
export const healthCheckAPI = async (): Promise<MessageResponse> => {
  const response = await api.get<MessageResponse>('/api/auth/health')
  return response.data
}