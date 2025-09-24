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
          <h1 class="text-2xl font-bold text-base-content">{{ pptData?.title }}</h1>
          <p class="text-base-content/60 mt-1">查看已保存的 PPT 课件</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline" @click="downloadPPT">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m6-1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          下载
        </button>
        <button class="btn btn-primary" @click="editPPT">
          编辑
        </button>
      </div>
    </div>

    <!-- PPT Viewer -->
    <div v-if="pptData" class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Slide List Sidebar -->
      <div class="lg:col-span-1">
        <div class="card bg-white sticky top-4">
          <div class="card-body p-4">
            <h4 class="font-semibold mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              幻灯片列表
            </h4>
            <div class="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
              <div 
                v-for="(slide, index) in pptData.slides" 
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
        <div class="card bg-white">
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
                  {{ currentSlideIndex + 1 }} / {{ pptData.slides.length }}
                </span>
                <button 
                  class="btn btn-circle btn-outline btn-sm" 
                  :disabled="currentSlideIndex === pptData.slides.length - 1"
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
                  {{ pptData.subject }} · {{ pptData.grade }}
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
    <div v-else class="text-center py-20">
      <p class="text-lg text-base-content/60">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPPTById, type SavedPPT } from '../data/mockPPTs'

const route = useRoute()
const router = useRouter()

const pptId = ref(parseInt(route.params.pptId as string))
const pptData = ref<SavedPPT | null>(null)
const currentSlideIndex = ref(0)

const currentSlide = computed(() => {
  if (!pptData.value || !pptData.value.slides) return null
  return pptData.value.slides[currentSlideIndex.value] || null
})

const downloadPPT = () => {
  if (pptData.value?.downloadUrl) {
    console.log('下载PPT:', pptData.value.downloadUrl)
  }
}

const editPPT = () => {
  // 跳转到编辑页面，或者在当前页面进入编辑模式
  console.log('编辑PPT:', pptId.value)
}

onMounted(() => {
  const data = getPPTById(pptId.value)
  if (data) {
    pptData.value = data
  } else {
    // PPT 不存在，可以跳转回资源列表
    router.push('/dashboard/teaching-resources')
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
</style>
