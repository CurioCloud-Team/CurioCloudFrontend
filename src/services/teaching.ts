// src/services/teaching.ts
import axios from 'axios'
import type {
  StartConversationRequest,
  StartConversationResponse,
  ProcessAnswerRequest,
  ProcessAnswerResponse,
  LessonPlan,
  LessonPlanListResponse,
  PPTGenerationResponse,
  PPTStatusResponse,
  PPTSlidesResponse
} from '@/types/teaching'

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

// 教学相关API

// 开始备课会话
export const startConversationAPI = async (
  request: StartConversationRequest = { use_dynamic_mode: true }
): Promise<StartConversationResponse> => {
  const response = await api.post<StartConversationResponse>('/api/teaching/conversational/start', request)
  return response.data
}

// 处理回答并获取下一步
export const processAnswerAPI = async (request: ProcessAnswerRequest): Promise<ProcessAnswerResponse> => {
  const response = await api.post<ProcessAnswerResponse>('/api/teaching/conversational/next', request)
  return response.data
}

// 获取教案列表
export const getLessonPlansAPI = async (): Promise<LessonPlanListResponse[]> => {
  const response = await api.get<LessonPlanListResponse[]>('/api/teaching/lesson-plans')
  return response.data
}

// 获取单个教案详情
export const getLessonPlanAPI = async (planId: number): Promise<LessonPlan> => {
  const response = await api.get<LessonPlan>(`/api/teaching/lesson-plans/${planId}`)
  return response.data
}

// 删除教案
export const deleteLessonPlanAPI = async (planId: number): Promise<void> => {
  await api.delete(`/api/teaching/lesson-plans/${planId}`)
}

// 从教案生成PPT
export const generatePPTFromLessonPlanAPI = async (planId: number): Promise<PPTGenerationResponse> => {
  const response = await api.post<PPTGenerationResponse>(`/api/teaching/lesson-plans/${planId}/generate-ppt`)
  return response.data
}

// 获取PPT生成状态
export const getPPTStatusAPI = async (pptProjectId: string): Promise<PPTStatusResponse> => {
  const response = await api.get<PPTStatusResponse>(`/api/teaching/ppt/${pptProjectId}/status`)
  return response.data
}

// 获取PPT幻灯片内容
export const getPPTSlidesAPI = async (pptProjectId: string): Promise<PPTSlidesResponse> => {
  const response = await api.get<PPTSlidesResponse>(`/api/teaching/ppt/${pptProjectId}/slides`)
  return response.data
}

// 导出PPT文件
export const exportPPTFileAPI = async (pptProjectId: string, exportFormat: 'pdf' | 'pptx'): Promise<Blob> => {
  const response = await api.get(`/api/teaching/ppt/${pptProjectId}/export/${exportFormat}`, {
    responseType: 'blob'
  })
  return response.data
}