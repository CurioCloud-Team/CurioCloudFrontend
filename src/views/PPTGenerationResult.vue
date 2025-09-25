<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button class="btn btn-ghost btn-circle" @click="$router.back()">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-base-content">PPT 生成结果</h1>
          <p class="text-base-content/60 mt-1">基于教学大纲生成的 PPT 课件</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button 
          class="btn btn-outline btn-error" 
          @click="discardPPT"
          :disabled="isProcessing"
        >
          舍弃
        </button>
        <button 
          class="btn btn-primary" 
          @click="savePPT"
          :disabled="isProcessing"
        >
          <span v-if="isProcessing" class="loading loading-spinner loading-sm mr-2"></span>
          保留
        </button>
      </div>
    </div>

    <!-- Generation Status -->
    <div class="card bg-white">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <svg v-if="generationStatus === 'completed'" class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div v-else class="loading loading-spinner text-primary"></div>
            </div>
            <div>
              <h3 class="font-semibold">{{ statusText }}</h3>
              <p class="text-sm text-base-content/60">{{ statusDescription }}</p>
            </div>
          </div>
          <div v-if="generationStatus === 'generating'" class="text-right">
            <div class="text-lg font-semibold">{{ generationProgress }}%</div>
            <progress class="progress progress-primary w-32" :value="generationProgress" max="100"></progress>
          </div>
        </div>
      </div>
    </div>

    <!-- Outline Info -->
    <div class="card bg-white">
      <div class="card-body">
        <h3 class="card-title text-base mb-3">基于教学大纲</h3>
        <div v-if="outlineInfo" class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold mb-1">{{ outlineInfo.title }}</h4>
            <p class="text-sm text-base-content/60 mb-2">{{ outlineInfo.subject }} · {{ outlineInfo.grade }}</p>
            <p class="text-sm">{{ outlineInfo.description }}</p>
            <div class="flex items-center gap-4 mt-3 text-xs text-base-content/60">
              <span>知识点: {{ outlineInfo.knowledgePoints }}</span>
              <span>活动数: {{ outlineInfo.activitiesCount }}</span>
              <span>时长: {{ outlineInfo.totalHours }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PPT Preview/Result -->
    <div class="card bg-white">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h3 class="card-title">生成的 PPT 内容</h3>
        </div>

        <!-- Loading State -->
        <div v-if="generationStatus === 'generating'" class="text-center py-12">
          <div class="loading loading-spinner loading-lg mb-4"></div>
          <p class="text-lg mb-2">正在生成 PPT...</p>
          <p class="text-sm text-base-content/60">这可能需要几分钟时间，请耐心等待</p>
        </div>

        <!-- Completed State -->
        <div v-else-if="generationStatus === 'completed' && pptResult" class="space-y-6">
          <!-- PPT Summary -->
          <div class="stats stats-horizontal bg-base-100">
            <div class="stat">
              <div class="stat-title">总页数</div>
              <div class="stat-value text-primary">{{ pptResult.slideCount }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">文件大小</div>
              <div class="stat-value text-primary">{{ formatFileSize(pptResult.fileSize) }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">生成时间</div>
              <div class="stat-value text-primary">{{ formatDuration(pptResult.generationTime) }}</div>
            </div>
          </div>

          <!-- PPT Viewer Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Slide List Sidebar -->
            <div class="lg:col-span-1">
              <div class="card  bg-base-100 sticky top-4">
                <div class="card-body p-4">
                  <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    幻灯片列表
                  </h4>
                  <div class="space-y-2 max-h-96 overflow-y-auto">
                    <div 
                      v-for="(slide, index) in pptResult.slides" 
                      :key="index"
                      class="slide-thumbnail p-3 rounded-lg border cursor-pointer transition-all hover:border-primary"
                      :class="{ 'border-primary bg-primary/5': currentSlideIndex === index, 'border-base-300': currentSlideIndex !== index }"
                      @click="currentSlideIndex = index"
                    >
                      <div class="flex items-start gap-3">
                        <div class="text-xs font-mono text-base-content/60 min-w-[2rem]">{{ index + 1 }}</div>
                        <div class="flex-1 min-w-0">
                          <h5 class="font-medium text-xs mb-1 line-clamp-1">{{ slide.title }}</h5>
                          <p class="text-xs text-base-content/60 line-clamp-2">{{ slide.content }}</p>
                          <span class="badge badge-outline badge-xs mt-2">{{ slide.type }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Slide Display -->
            <div class="lg:col-span-3">
              <div class="card bg-base-100">
                <div class="card-body p-6">
                  <!-- Slide Navigation -->
                  <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-4">
                      <button 
                        class="btn btn-circle btn-outline btn-sm" 
                        :disabled="currentSlideIndex === 0"
                        @click="currentSlideIndex--"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                      </button>
                      <span class="text-sm font-medium">
                        {{ currentSlideIndex + 1 }} / {{ pptResult.slides.length }}
                      </span>
                      <button 
                        class="btn btn-circle btn-outline btn-sm" 
                        :disabled="currentSlideIndex === pptResult.slides.length - 1"
                        @click="currentSlideIndex++"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-primary">{{ currentSlide?.type }}</span>
                    </div>
                  </div>

                  <!-- Slide Content -->
                  <div class="slide-content bg-white rounded-lg shadow-inner p-8 min-h-[500px] relative" v-if="currentSlide">
                    <!-- Slide based on type -->
                    <div v-if="currentSlide.type === '标题页'" class="h-full flex flex-col items-center justify-center text-center">
                      <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ currentSlide.title }}</h1>
                      <div class="w-24 h-1 bg-blue-500 mb-6"></div>
                      <p class="text-lg text-gray-600 max-w-2xl">{{ currentSlide.content }}</p>
                      <div class="mt-8 text-sm text-gray-500">
                        {{ outlineInfo?.subject }} · {{ outlineInfo?.grade }}
                      </div>
                    </div>

                    <div v-else-if="currentSlide.type === '内容页'" class="h-full">
                      <div class="border-b-2 border-blue-500 pb-4 mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">{{ currentSlide.title }}</h2>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 h-96">
                        <div>
                          <div class="prose prose-lg">
                            <p class="text-gray-700 leading-relaxed">{{ currentSlide.content }}</p>
                            <div v-if="currentSlide.bulletPoints" class="mt-4">
                              <ul class="list-disc list-inside space-y-2">
                                <li v-for="point in currentSlide.bulletPoints" :key="point" class="text-gray-700">
                                  {{ point }}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center justify-center bg-gray-100 rounded-lg">
                          <div class="text-center text-gray-400">
                            <svg class="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p class="text-sm">配图区域</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else-if="currentSlide.type === '活动页'" class="h-full">
                      <div class="border-b-2 border-green-500 pb-4 mb-6">
                        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
                          <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {{ currentSlide.title }}
                        </h2>
                      </div>
                      <div class="space-y-6">
                        <div class="bg-green-50 p-6 rounded-lg">
                          <h3 class="font-semibold text-green-800 mb-3">活动目标</h3>
                          <p class="text-gray-700">{{ currentSlide.content }}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-medium text-blue-800 mb-3">操作步骤</h4>
                            <div v-if="currentSlide.steps" class="space-y-2">
                              <div v-for="(step, idx) in currentSlide.steps" :key="idx" class="flex items-start gap-3">
                                <span class="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mt-0.5">{{ idx + 1 }}</span>
                                <span class="text-gray-700 text-sm">{{ step }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="bg-yellow-50 p-4 rounded-lg">
                            <h4 class="font-medium text-yellow-800 mb-3">注意事项</h4>
                            <div v-if="currentSlide.notes" class="space-y-1">
                              <p v-for="note in currentSlide.notes" :key="note" class="text-gray-700 text-sm">• {{ note }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else-if="currentSlide.type === '练习页'" class="h-full">
                      <div class="border-b-2 border-purple-500 pb-4 mb-6">
                        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
                          <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {{ currentSlide.title }}
                        </h2>
                      </div>
                      <div class="space-y-6">
                        <p class="text-gray-700 text-lg">{{ currentSlide.content }}</p>
                        <div v-if="currentSlide.exercises" class="space-y-4">
                          <div v-for="(exercise, idx) in currentSlide.exercises" :key="idx" class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-start gap-3">
                              <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-medium">{{ idx + 1 }}</span>
                              <div class="flex-1">
                                <p class="text-gray-800 mb-2">{{ exercise.question }}</p>
                                <div v-if="exercise.options" class="space-y-1 ml-4">
                                  <div v-for="option in exercise.options" :key="option" class="text-gray-600 text-sm">
                                    {{ option }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Elements indicator -->
                    <div v-if="currentSlide.elements && currentSlide.elements.length > 0" class="absolute bottom-4 right-4">
                      <div class="flex gap-2">
                        <span 
                          v-for="element in currentSlide.elements" 
                          :key="element"
                          class="badge badge-outline badge-xs"
                        >
                          {{ element }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="generationStatus === 'error'" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="text-lg mb-2 text-error">生成失败</p>
          <p class="text-sm text-base-content/60 mb-4">{{ errorMessage || '生成过程中发生错误，请重试' }}</p>
          <button class="btn btn-outline btn-primary" @click="retryGeneration">
            重新生成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOutlineDetail } from '../data/mockOutlines'
import { getPPTStatusAPI, getPPTSlidesAPI, generatePPTFromLessonPlanAPI } from '@/services/teaching'

const route = useRoute()
const router = useRouter()

// 响应式数据
const planId = ref<number | null>(null)
const pptProjectId = ref<string | null>(null)
const generationStatus = ref<'generating' | 'completed' | 'error'>('generating')
const generationProgress = ref(0)
const isProcessing = ref(false)
const errorMessage = ref('')
const currentSlideIndex = ref(0)

// 教学大纲信息
const outlineInfo = ref<any>(null)

// PPT 生成结果
const pptResult = ref<any>(null)

// 检查路由参数
const isByProjectId = computed(() => route.params.pptProjectId !== undefined)

// 计算属性
const statusText = computed(() => {
  switch (generationStatus.value) {
    case 'generating':
      return 'AI 正在生成 PPT...'
    case 'completed':
      return 'PPT 生成完成'
    case 'error':
      return '生成失败'
    default:
      return ''
  }
})

const statusDescription = computed(() => {
  switch (generationStatus.value) {
    case 'generating':
      return '基于教学大纲内容，智能生成课件结构和内容'
    case 'completed':
      return 'PPT 已成功生成，您可以预览、下载或保存到资源库'
    case 'error':
      return '生成过程中遇到问题，请检查网络连接后重试'
    default:
      return ''
  }
})

const currentSlide = computed(() => {
  if (!pptResult.value || !pptResult.value.slides_data) return null
  return pptResult.value.slides_data[currentSlideIndex.value] || null
})

// 方法
const loadExistingPPT = async () => {
  if (!pptProjectId.value) return
  
  try {
    // 获取PPT状态
    const statusResponse = await getPPTStatusAPI(pptProjectId.value)
    
    // 根据状态处理
    if (statusResponse.status && typeof statusResponse.status === 'object') {
      const status = statusResponse.status as any
      if (status.status === 'completed') {
        generationStatus.value = 'completed'
        // 获取PPT内容
        const slidesResponse = await getPPTSlidesAPI(pptProjectId.value)
        pptResult.value = slidesResponse
      } else if (status.status === 'processing' || status.status === 'pending') {
        generationStatus.value = 'generating'
        // 继续轮询状态
        pollPPTStatus()
      } else {
        generationStatus.value = 'error'
        errorMessage.value = 'PPT生成失败'
      }
    }
  } catch (error) {
    console.error('加载PPT失败:', error)
    generationStatus.value = 'error'
    errorMessage.value = '加载PPT失败，请重试'
  }
}

const generatePPTFromOutline = async () => {
  if (!planId.value) return
  
  try {
    // 调用API生成PPT
    const response = await generatePPTFromLessonPlanAPI(planId.value)
    
    if (response.success && response.ppt_project_id) {
      pptProjectId.value = response.ppt_project_id
      // 开始轮询状态
      pollPPTStatus()
    } else {
      generationStatus.value = 'error'
      errorMessage.value = response.message || 'PPT生成失败'
    }
  } catch (error) {
    console.error('生成PPT失败:', error)
    generationStatus.value = 'error'
    errorMessage.value = '网络连接失败，请检查网络后重试'
  }
}

const pollPPTStatus = async () => {
  if (!pptProjectId.value) return
  
  const pollInterval = setInterval(async () => {
    try {
      const statusResponse = await getPPTStatusAPI(pptProjectId.value!)
      
      if (statusResponse.status && typeof statusResponse.status === 'object') {
        const status = statusResponse.status as any
        
        // 更新进度（如果有的话）
        if (status.progress !== undefined) {
          generationProgress.value = Math.min(status.progress, 100)
        }
        
        if (status.status === 'completed') {
          clearInterval(pollInterval)
          generationStatus.value = 'completed'
          // 获取PPT内容
          const slidesResponse = await getPPTSlidesAPI(pptProjectId.value!)
          pptResult.value = slidesResponse
        } else if (status.status === 'failed' || status.status === 'error') {
          clearInterval(pollInterval)
          generationStatus.value = 'error'
          errorMessage.value = status.message || 'PPT生成失败'
        }
      }
    } catch (error) {
      console.error('轮询PPT状态失败:', error)
      clearInterval(pollInterval)
      generationStatus.value = 'error'
      errorMessage.value = '检查生成状态失败'
    }
  }, 2000) // 每2秒检查一次
  
  // 5分钟超时
  setTimeout(() => {
    clearInterval(pollInterval)
    if (generationStatus.value === 'generating') {
      generationStatus.value = 'error'
      errorMessage.value = '生成超时，请稍后重试'
    }
  }, 5 * 60 * 1000)
}

const savePPT = async () => {
  if (!pptResult.value || !pptProjectId.value) return
  
  isProcessing.value = true
  
  try {
    // 这里可以调用保存PPT的API，或者直接跳转
    // 目前先跳转回教学资源页面
    router.push('/dashboard/teaching-resources')
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
    isProcessing.value = false
  }
}

const discardPPT = () => {
  // 舍弃PPT，返回教学资源页面
  router.push('/dashboard/teaching-resources')
}

const retryGeneration = () => {
  if (planId.value) {
    generationStatus.value = 'generating'
    generationProgress.value = 0
    pptResult.value = null
    errorMessage.value = ''
    generatePPTFromOutline()
  }
}

const formatFileSize = (bytes: number) => {
  if (!bytes) return '未知'
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

const formatDuration = (seconds: number) => {
  if (!seconds) return '未知'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}分${remainingSeconds}秒`
}

onMounted(() => {
  if (isByProjectId.value) {
    // 新的路由：基于PPT项目ID
    pptProjectId.value = route.params.pptProjectId as string
    loadExistingPPT()
  } else {
    // 旧的路由：基于计划ID，需要先生成PPT
    planId.value = parseInt(route.params.planId as string)
    outlineInfo.value = getOutlineDetail(planId.value)
    if (!outlineInfo.value) {
      router.push('/dashboard/teaching-resources')
      return
    }
    generatePPTFromOutline()
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.slide-thumbnail {
  transition: all 0.2s ease-in-out;
}

.slide-thumbnail:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.slide-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
}

@media print {
  .slide-content {
    background: white;
    border: none;
    box-shadow: none;
  }
}
</style>