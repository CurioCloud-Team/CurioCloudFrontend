// src/services/exercise.ts
import axios from 'axios'
import type {
  Question,
  GenerateMCQRequest,
  GenerateFITBRequest,
  GenerateSAQRequest
} from '@/types/exercise'

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

// 练习相关API

// 生成选择题
export const generateMultipleChoiceQuestionsAPI = async (
  planId: number,
  request: GenerateMCQRequest = { num_questions: 5, difficulty: 'medium' }
): Promise<Question[]> => {
  const response = await api.post<Question[]>(
    `/api/exercises/lesson-plan/${planId}/generate-multiple-choice`,
    request
  )
  return response.data
}

// 生成填空题
export const generateFillInTheBlankQuestionsAPI = async (
  planId: number,
  request: GenerateFITBRequest = { num_questions: 5, difficulty: 'medium' }
): Promise<Question[]> => {
  const response = await api.post<Question[]>(
    `/api/exercises/lesson-plan/${planId}/generate-fill-in-the-blank`,
    request
  )
  return response.data
}

// 生成简答题
export const generateShortAnswerQuestionsAPI = async (
  planId: number,
  request: GenerateSAQRequest = { num_questions: 5, difficulty: 'medium' }
): Promise<Question[]> => {
  const response = await api.post<Question[]>(
    `/api/exercises/lesson-plan/${planId}/generate-short-answer`,
    request
  )
  return response.data
}