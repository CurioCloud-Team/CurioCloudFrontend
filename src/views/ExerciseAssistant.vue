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
      <div class="card bg-white hover:shadow-lg transition-shadow cursor-pointer">
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
        <!-- My exercises -->
        <div class="card bg-white">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title">我的习题</h2>
              <button class="btn btn-ghost btn-sm" @click="refreshSavedResults">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                刷新
              </button>
            </div>
            
            <!-- Saved exercises list -->
            <div class="space-y-3" v-if="savedResults.length > 0">
              <div 
                v-for="result in savedResults" 
                :key="result.id"
                class="border border-base-300 rounded-lg p-4 hover:bg-base-50 transition-colors cursor-pointer"
                @click="viewSavedResult(result)"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-base truncate flex-1 mr-3">{{ result.outline_title }}</h4>
                  <div class="flex items-center gap-2 text-sm text-base-content/60">
                    <span class="badge badge-primary badge-sm">{{ result.total_count }}题</span>
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm text-base-content/60">
                  <span>保存于 {{ formatSavedTime(result.saved_at) }}</span>
                  <div class="flex items-center gap-2">
                    <button 
                      class="btn btn-ghost btn-xs" 
                      @click.stop="editSavedResult(result)"
                      title="编辑"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button 
                      class="btn btn-ghost btn-xs text-error" 
                      @click.stop="deleteSavedResult(result.id)"
                      title="删除"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div v-else class="text-center text-base-content/60 py-8">
              <svg class="w-12 h-12 mx-auto mb-3 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="mb-2">暂无已保存的习题</p>
              <p class="text-sm">点击"智能生成"创建新的习题</p>
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
import { getSavedExerciseResults, deleteSavedExerciseResult as deleteSaved, type SavedExerciseResult } from '../data/mockExercises'

// 路由
const router = useRouter()

// 响应式数据
const showOutlineModal = ref(false)
const selectedOutlineId = ref<number | null>(null)
const isGenerating = ref(false)
const outlines = ref<TeachingOutlineDetail[]>([])
const savedResults = ref<SavedExerciseResult[]>([])

// 获取大纲列表
const loadOutlines = () => {
  // 从模拟数据中获取大纲列表
  outlines.value = Object.values(mockOutlineDetails)
}

// 获取保存的习题结果
const loadSavedResults = () => {
  savedResults.value = getSavedExerciseResults()
}

// 刷新保存的结果
const refreshSavedResults = () => {
  loadSavedResults()
}

// 格式化保存时间
const formatSavedTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else {
    return '刚刚'
  }
}

// 查看保存的结果
const viewSavedResult = (result: SavedExerciseResult) => {
  // 跳转到生成结果页面，并传递保存的结果ID
  router.push({
    name: 'ExerciseGenerationResult',
    query: { 
      savedId: result.id,
      outlineId: result.outline_id.toString()
    }
  })
}

// 编辑保存的结果
const editSavedResult = (result: SavedExerciseResult) => {
  // 跳转到生成结果页面进行编辑
  router.push({
    name: 'ExerciseGenerationResult',
    query: { 
      savedId: result.id,
      outlineId: result.outline_id.toString(),
      edit: 'true'
    }
  })
}

// 删除保存的结果
const deleteSavedResult = (id: string) => {
  if (confirm('确定要删除这个习题结果吗？此操作不可撤销。')) {
    const success = deleteSaved(id)
    if (success) {
      loadSavedResults() // 重新加载列表
    }
  }
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

// 页面加载时获取数据
onMounted(() => {
  loadOutlines()
  loadSavedResults()
})
</script>