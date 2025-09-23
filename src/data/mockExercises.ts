// 习题类型定义
export interface Exercise {
  id: number
  lesson_plan_id: number
  question_type: 'multiple_choice' | 'short_answer' | 'essay' | 'true_false' | 'fill_blank'
  difficulty: 'easy' | 'medium' | 'hard'
  content: string
  answer: string
  choices?: string[]
}

// 习题生成结果类型
export interface ExerciseGenerationResult {
  lesson_plan_id: number
  outline_title?: string
  exercises: Exercise[]
  created_at: string
}

// 模拟习题生成结果
export const mockExerciseResults: ExerciseGenerationResult[] = [
  {
    lesson_plan_id: 18,
    outline_title: 'GoLang入门教程',
    exercises: [
      {
        lesson_plan_id: 18,
        question_type: "short_answer",
        difficulty: "medium",
        content: "根据课程大纲，本课程的教学对象是哪类学生？并简述课程设计上如何帮助这类学生快速入门GoLang？",
        answer: "本课程的教学对象是已有其他编程语言基础（如Python/JavaScript）但对GoLang不熟悉的同学。课程设计上通过\"理论讲解（50%）+ 实践操作（50%）\"的方式，从趣味导入开始，通过对比现有知识介绍GoLang的独特魅力和基础语法，并提供互动式编程练习，帮助学生快速入门。",
        id: 11,
        choices: []
      },
      {
        lesson_plan_id: 18,
        question_type: "short_answer",
        difficulty: "medium",
        content: "课程中将学习GoLang的哪些基本语法和控制流？请列举至少三项。",
        answer: "课程中将学习GoLang的基本语法，包括变量声明、数据类型和控制流（if/else，for循环）。",
        id: 12,
        choices: []
      },
      {
        lesson_plan_id: 18,
        question_type: "short_answer",
        difficulty: "medium",
        content: "课程的教学目标中提到要掌握GoLang中常用的数据结构，请列举至少两种。",
        answer: "课程中要掌握GoLang中常用的数据结构，例如数组、切片、映射。",
        id: 13,
        choices: []
      },
      {
        lesson_plan_id: 18,
        question_type: "short_answer",
        difficulty: "medium",
        content: "除了基本语法和数据结构，本课程还会让学生理解GoLang的哪项重要机制？这项机制的作用是什么？",
        answer: "本课程还会让学生理解GoLang的包管理机制。这项机制的作用是能够引入和使用标准库中的常用包，方便代码的组织和复用。",
        id: 14,
        choices: []
      },
      {
        lesson_plan_id: 18,
        question_type: "short_answer",
        difficulty: "medium",
        content: "课程的最终目标是让学生能够独立运用GoLang解决实际问题。为了达成这个目标，课程中会通过什么方式进行实践操作？",
        answer: "为了达成这个目标，课程中会通过一系列互动式编程练习，让学生亲自动手，逐步构建一个简单的数据处理脚本或命令行工具。",
        id: 15,
        choices: []
      }
    ],
    created_at: '2024-09-24T10:30:00Z'
  }
]

// 获取难度显示文本
export function getDifficultyText(difficulty: string): string {
  const difficultyMap: Record<string, string> = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  }
  return difficultyMap[difficulty] || difficulty
}

// 获取题型显示文本
export function getQuestionTypeText(type: string): string {
  const typeMap: Record<string, string> = {
    'multiple_choice': '选择题',
    'short_answer': '简答题',
    'essay': '论述题',
    'true_false': '判断题',
    'fill_blank': '填空题'
  }
  return typeMap[type] || type
}

// 保存的习题结果类型
export interface SavedExerciseResult {
  id: string
  outline_id: number
  outline_title: string
  exercises: Exercise[]
  created_at: string
  saved_at: string
  total_count: number
}

// 模拟保存的习题结果（用于展示在"我的习题"中）
export const savedExerciseResults: SavedExerciseResult[] = [
  {
    id: 'saved_001',
    outline_id: 18,
    outline_title: 'GoLang入门教程教学大纲',
    exercises: mockExerciseResults[0].exercises,
    created_at: '2024-09-24T10:30:00Z',
    saved_at: '2024-09-24T10:35:00Z',
    total_count: 5
  }
]

// 添加保存的习题结果
export function addSavedExerciseResult(result: ExerciseGenerationResult): SavedExerciseResult {
  const savedResult: SavedExerciseResult = {
    id: `saved_${Date.now()}`,
    outline_id: result.lesson_plan_id,
    outline_title: result.outline_title || '未知大纲',
    exercises: result.exercises,
    created_at: result.created_at,
    saved_at: new Date().toISOString(),
    total_count: result.exercises.length
  }
  
  savedExerciseResults.unshift(savedResult) // 添加到开头
  return savedResult
}

// 获取保存的习题结果列表
export function getSavedExerciseResults(): SavedExerciseResult[] {
  return savedExerciseResults
}

// 根据ID获取保存的习题结果
export function getSavedExerciseResult(id: string): SavedExerciseResult | null {
  return savedExerciseResults.find(result => result.id === id) || null
}

// 删除保存的习题结果
export function deleteSavedExerciseResult(id: string): boolean {
  const index = savedExerciseResults.findIndex(result => result.id === id)
  if (index !== -1) {
    savedExerciseResults.splice(index, 1)
    return true
  }
  return false
}
