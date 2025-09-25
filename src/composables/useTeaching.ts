// 使用示例：src/composables/useTeaching.ts
import { ref } from 'vue'
import type {
  LessonPlan,
  LessonPlanListResponse,
  StartConversationRequest,
  StartConversationResponse
} from '@/types/teaching'
import {
  getLessonPlansAPI,
  startConversationAPI
} from '@/services/teaching'

export const useTeaching = () => {
  const lessonPlans = ref<LessonPlanListResponse[]>([])
  const currentLessonPlan = ref<LessonPlan | null>(null)
  const isLoading = ref(false)

  // 获取教案列表
  const fetchLessonPlans = async () => {
    isLoading.value = true
    try {
      const plans = await getLessonPlansAPI()
      lessonPlans.value = plans
    } catch (error) {
      console.error('获取教案列表失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 开始备课会话
  const startTeachingSession = async (
    request: StartConversationRequest = { use_dynamic_mode: true }
  ): Promise<StartConversationResponse> => {
    const response = await startConversationAPI(request)
    return response
  }

  return {
    lessonPlans,
    currentLessonPlan,
    isLoading,
    fetchLessonPlans,
    startTeachingSession
  }
}