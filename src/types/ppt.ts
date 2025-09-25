// src/types/ppt.ts

// 重新导出teaching中的PPT相关类型
export type {
  PPTGenerationResponse,
  PPTStatusResponse,
  PPTSlidesResponse
} from './teaching'

// PPT导出格式
export type PPTExportFormat = 'pdf' | 'pptx'

// PPT导出请求
export interface PPTExportRequest {
  ppt_project_id: string
  export_format: PPTExportFormat
}

// PPT项目信息
export interface PPTProjectInfo {
  project_id: string
  title: string
  scenario?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at?: string
}