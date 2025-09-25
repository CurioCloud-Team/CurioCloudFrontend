// src/types/exercise.ts

// 难度等级枚举
export type DifficultyLevel = 'easy' | 'medium' | 'hard'

// 问题类型枚举
export type QuestionType = 'multiple_choice' | 'fill_in_the_blank' | 'short_answer'

// 选择题选项
export interface Choice {
  content: string
  is_correct: boolean
  id: number
  question_id: number
}

// 问题基础接口
export interface Question {
  lesson_plan_id: number
  question_type: QuestionType
  difficulty: DifficultyLevel
  content: string
  answer?: string | null
  id: number
  choices?: Choice[]
}

// 生成选择题请求
export interface GenerateMCQRequest {
  num_questions?: number
  difficulty?: DifficultyLevel
}

// 生成填空题请求
export interface GenerateFITBRequest {
  num_questions?: number
  difficulty?: DifficultyLevel
}

// 生成简答题请求
export interface GenerateSAQRequest {
  num_questions?: number
  difficulty?: DifficultyLevel
}