<template>
  <div class="min-h-screen flex flex-col">
    <!-- Back Button -->
    <button class="fixed top-6 left-6 btn btn-ghost btn-sm text-gray-600 z-10" @click="goBack">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      返回
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
        <p class="text-gray-600">正在加载教案详情...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="alert alert-error max-w-md">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <div>
            <h3 class="font-bold">加载失败</h3>
            <div class="text-xs">{{ error }}</div>
          </div>
        </div>
        <button class="btn btn-primary mt-4" @click="loadLessonPlan">重试</button>
      </div>
    </div>

    <!-- Lesson Plan Content -->
    <div v-else-if="lessonPlan" class="flex-1">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ lessonPlan.title }}</h1>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  {{ lessonPlan.subject }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {{ lessonPlan.grade }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ formatDate(lessonPlan.created_at) }}
                </span>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                class="btn btn-primary"
                @click="generatePPT"
                :disabled="isGeneratingPPT"
              >
                <svg v-if="!isGeneratingPPT" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z"></path>
                </svg>
                <div v-if="isGeneratingPPT" class="loading loading-spinner loading-sm mr-2"></div>
                {{ isGeneratingPPT ? '生成中...' : '生成PPT' }}
              </button>
              <button class="btn btn-outline" @click="generateExercises">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                生成练习
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="max-w-4xl mx-auto p-6 space-y-8">

          <!-- Teaching Objective -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              教学目标
            </h2>
            <p class="text-gray-700 leading-relaxed">{{ lessonPlan.teaching_objective }}</p>
          </div>

          <!-- Teaching Outline -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              教学大纲
            </h2>
            <div class="prose prose-gray max-w-none">
              <pre class="whitespace-pre-wrap text-gray-700">{{ lessonPlan.teaching_outline }}</pre>
            </div>
          </div>

          <!-- Teaching Activities -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              教学活动
            </h2>
            <div class="space-y-4">
              <div
                v-for="(activity, index) in lessonPlan.activities"
                :key="index"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-medium text-gray-800">{{ activity.activity_name }}</h3>
                  <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {{ activity.duration }}分钟
                  </span>
                </div>
                <p class="text-gray-700">{{ activity.description }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getLessonPlanAPI, generatePPTFromLessonPlanAPI } from '@/services/teaching'
import type { LessonPlan } from '@/types/teaching'

const router = useRouter()
const route = useRoute()

const lessonPlan = ref<LessonPlan | null>(null)
const isLoading = ref(true)
const error = ref('')
const isGeneratingPPT = ref(false)

const loadLessonPlan = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const planId = parseInt(route.params.planId as string)
    const response = await getLessonPlanAPI(planId)
    lessonPlan.value = response
  } catch (err) {
    console.error('加载教案失败:', err)
    error.value = '加载教案详情失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

const generatePPT = async () => {
  if (!lessonPlan.value) return

  try {
    isGeneratingPPT.value = true
    await generatePPTFromLessonPlanAPI(lessonPlan.value.id)

    // 跳转到PPT生成结果页面
    router.push({
      name: 'PPTGenerationResult',
      params: { planId: lessonPlan.value.id.toString() }
    })
  } catch (err) {
    console.error('生成PPT失败:', err)
    // 可以添加错误提示
  } finally {
    isGeneratingPPT.value = false
  }
}

const generateExercises = () => {
  if (!lessonPlan.value) return

  // 跳转到练习生成页面，传递planId
  router.push({
    name: 'ExerciseAssistant',
    query: { planId: lessonPlan.value.id.toString() }
  })
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return '未知时间'
  return new Date(dateString).toLocaleString('zh-CN')
}

const goBack = () => {
  router.push('/dashboard/teaching-design')
}

onMounted(() => {
  loadLessonPlan()
})
</script>

<style scoped>
.prose pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>