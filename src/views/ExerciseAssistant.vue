<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">习题助手</h1>
        <p class="text-base-content/60 mt-1">智能生成和管理习题，提升教学效率</p>
      </div>
      <button class="btn btn-primary" @click="showOutlineModal = true">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        智能生成
      </button>
    </div>

    <!-- Feature cards -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Question generation -->
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div class="card-body">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">智能出题</h3>
              <p class="text-sm text-base-content/60">AI辅助生成习题</p>
            </div>
          </div>
          <p class="text-sm text-base-content/70 mb-4">
            基于教学内容和难度要求，智能生成各类型习题，支持选择题、填空题、问答题等。
          </p>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm" @click="showOutlineModal = true">开始生成</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Left column -->
      <div class="space-y-6">
        <!-- Recent activities -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title">最近活动</h2>
              <button class="btn btn-ghost btn-sm">查看全部</button>
            </div>
            <div class="space-y-4">
              <div class="text-center text-base-content/60 py-8">
                <svg class="w-12 h-12 mx-auto mb-3 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p>暂无习题活动记录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教学大纲选择弹层 -->
    <div v-if="showOutlineModal" class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-lg mb-4">选择教学大纲</h3>
        <p class="text-base-content/60 mb-6">请选择要生成习题的教学大纲</p>
        
        <!-- 大纲列表 -->
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div 
            v-for="outline in outlines" 
            :key="outline.id"
            class="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
            :class="{ 'ring-2 ring-primary': selectedOutlineId === outline.id }"
            @click="selectedOutlineId = outline.id"
          >
            <div class="card-body p-4">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h4 class="font-semibold text-base">{{ outline.title }}</h4>
                  <div class="flex items-center gap-4 mt-2 text-sm text-base-content/60">
                    <span class="badge badge-outline">{{ outline.subject }}</span>
                    <span>{{ outline.grade }}</span>
                    <span>{{ outline.duration }}</span>
                  </div>
                  <p class="text-sm text-base-content/70 mt-2 line-clamp-2">{{ outline.description }}</p>
                </div>
                <div v-if="selectedOutlineId === outline.id" class="text-primary">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn" @click="closeModal">取消</button>
          <button 
            class="btn btn-primary" 
            :disabled="!selectedOutlineId || isGenerating"
            @click="generateExercises"
          >
            <span v-if="isGenerating" class="loading loading-spinner loading-sm mr-2"></span>
            {{ isGenerating ? '生成中...' : '开始生成' }}
          </button>
        </div>
      </div>
      <div class="modal-backdrop" @click="closeModal"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mockOutlineDetails, type TeachingOutlineDetail } from '../data/mockOutlines'

// 路由
const router = useRouter()

// 响应式数据
const showOutlineModal = ref(false)
const selectedOutlineId = ref<number | null>(null)
const isGenerating = ref(false)
const outlines = ref<TeachingOutlineDetail[]>([])

// 获取大纲列表
const loadOutlines = () => {
  // 从模拟数据中获取大纲列表
  outlines.value = Object.values(mockOutlineDetails)
}

// 关闭弹层
const closeModal = () => {
  showOutlineModal.value = false
  selectedOutlineId.value = null
}

// 生成习题
const generateExercises = async () => {
  if (!selectedOutlineId.value) return
  
  isGenerating.value = true
  
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 跳转到生成结果页面，传递大纲ID
  router.push({
    name: 'ExerciseGenerationResult',
    query: { outlineId: selectedOutlineId.value.toString() }
  })
  
  isGenerating.value = false
  closeModal()
}

// 页面加载时获取大纲列表
onMounted(() => {
  loadOutlines()
})
</script>