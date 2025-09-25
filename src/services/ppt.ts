// src/services/ppt.ts
import axios from 'axios'

// PPT相关API (主要通过teaching服务提供)

// 重新导出teaching服务中的PPT相关方法
export {
  generatePPTFromLessonPlanAPI,
  getPPTStatusAPI,
  getPPTSlidesAPI,
  exportPPTFileAPI
} from './teaching'

// LandPPT API 基础 URL
const LANDPPT_API_BASE_URL = import.meta.env.VITE_LANDPPT_BASE_URL || 'http://localhost:8001'

// 创建 LandPPT API axios 实例
const landpptApi = axios.create({
  baseURL: LANDPPT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：添加认证令牌 (如果LandPPT需要认证)
landpptApi.interceptors.request.use(
  (config) => {
    // 如果LandPPT需要认证，可以在这里添加token
    // const token = localStorage.getItem('landppt_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// LandPPT 项目相关类型
export interface LandPPTProject {
  project_id: string
  title: string
  scenario: string
  topic: string
  status: string
  created_at: number
  updated_at: number
  outline?: any
  slides_html?: string
  slides_data?: any[]
  confirmed_requirements?: any
  project_metadata?: any
  todo_board?: any
  version: number
  versions: any[]
}

export interface ProjectListResponse {
  projects: LandPPTProject[]
  total: number
  page: number
  page_size: number
}

// 获取PPT项目列表
export const getPPTProjectsAPI = async (
  page: number = 1,
  pageSize: number = 10,
  status?: string
): Promise<ProjectListResponse> => {
  const params: any = { page, page_size: pageSize }
  if (status) {
    params.status = status
  }

  const response = await landpptApi.get<ProjectListResponse>('/api/projects', { params })
  return response.data
}

// 获取单个PPT项目详情
export const getPPTProjectAPI = async (projectId: string): Promise<LandPPTProject> => {
  const response = await landpptApi.get<LandPPTProject>(`/api/projects/${projectId}`)
  return response.data
}

// 删除PPT项目
export const deletePPTProjectAPI = async (projectId: string): Promise<void> => {
  await landpptApi.delete(`/api/projects/${projectId}`)
}