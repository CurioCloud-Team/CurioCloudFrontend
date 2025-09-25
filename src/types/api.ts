// src/types/api.ts
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success?: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
}

// 通用错误接口
export interface ApiError {
  message: string
  code?: string | number
  details?: any
}