// src/types/teaching.ts

// 会话相关类型
export interface StartConversationRequest {
  use_dynamic_mode?: boolean | null
}

export interface StartConversationResponse {
  session_id: string
  question_card: QuestionCard
  is_dynamic_mode: boolean
}

export interface ProcessAnswerRequest {
  session_id: string
  answer: string
}

export interface ProcessAnswerResponse {
  session_id: string
  status: string
  is_dynamic_mode: boolean
  question_card?: QuestionCard | null
  lesson_plan?: LessonPlan | null
}

export interface SessionInfo {
  session_id: string
  status: string
  is_dynamic_mode: boolean
  question_count: number
  max_questions: number
  current_step?: string | null
  collected_data: object
  created_at: string
}

// 问题卡片类型
export interface QuestionCard {
  step_key: string
  question: string
  options: string[]
  allows_free_text: boolean
}

// 教案相关类型
export interface LessonPlan {
  id: number
  title: string
  subject: string
  grade: string
  teaching_objective: string
  teaching_outline: string
  activities: LessonPlanActivity[]
  created_at: string | null
  web_search_info?: object | null
}

export interface LessonPlanActivity {
  activity_name: string
  description: string
  duration: number
  order_index: number
}

export interface LessonPlanListResponse {
  id: number
  title: string
  subject: string
  grade: string
  created_at: string
}

// PPT相关类型
export interface PPTGenerationResponse {
  success: boolean
  ppt_project_id: string | null
  ppt_title: string | null
  ppt_scenario: string | null
  message: string
}

export interface PPTStatusResponse {
  ppt_project_id: string
  status: object
}

export interface PPTSlidesResponse {
  project_id: string
  title: string
  slides_html: string | null
  slides_data: object[]
  slides_count: number
}