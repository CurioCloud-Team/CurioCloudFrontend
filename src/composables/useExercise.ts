// 使用示例：src/composables/useExercise.ts
import { ref } from 'vue'
import type {
  Question,
  DifficultyLevel,
  GenerateMCQRequest
} from '@/types/exercise'
import {
  generateMultipleChoiceQuestionsAPI,
  generateFillInTheBlankQuestionsAPI,
  generateShortAnswerQuestionsAPI
} from '@/services/exercise'

export const useExercise = () => {
  const questions = ref<Question[]>([])
  const isGenerating = ref(false)

  // 生成选择题
  const generateMCQs = async (
    planId: number,
    numQuestions: number = 5,
    difficulty: DifficultyLevel = 'medium'
  ) => {
    isGenerating.value = true
    try {
      const request: GenerateMCQRequest = {
        num_questions: numQuestions,
        difficulty
      }
      const newQuestions = await generateMultipleChoiceQuestionsAPI(planId, request)
      questions.value = newQuestions
    } catch (error) {
      console.error('生成选择题失败:', error)
    } finally {
      isGenerating.value = false
    }
  }

  // 生成填空题
  const generateFITBs = async (
    planId: number,
    numQuestions: number = 5,
    difficulty: DifficultyLevel = 'medium'
  ) => {
    isGenerating.value = true
    try {
      const newQuestions = await generateFillInTheBlankQuestionsAPI(planId, {
        num_questions: numQuestions,
        difficulty
      })
      questions.value = newQuestions
    } catch (error) {
      console.error('生成填空题失败:', error)
    } finally {
      isGenerating.value = false
    }
  }

  // 生成简答题
  const generateSAQs = async (
    planId: number,
    numQuestions: number = 5,
    difficulty: DifficultyLevel = 'medium'
  ) => {
    isGenerating.value = true
    try {
      const newQuestions = await generateShortAnswerQuestionsAPI(planId, {
        num_questions: numQuestions,
        difficulty
      })
      questions.value = newQuestions
    } catch (error) {
      console.error('生成简答题失败:', error)
    } finally {
      isGenerating.value = false
    }
  }

  return {
    questions,
    isGenerating,
    generateMCQs,
    generateFITBs,
    generateSAQs
  }
}