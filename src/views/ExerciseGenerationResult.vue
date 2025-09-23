<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button class="btn btn-ghost btn-sm" @click="goBack">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-base-content">
            {{ isFromSaved ? '我的习题' : '习题生成结果' }}
          </h1>
          <p class="text-base-content/60 mt-1">
            {{ isFromSaved ? '查看已保存的习题' : '基于' }}「{{ outlineTitle }}」{{ isFromSaved ? '' : '生成的智能习题' }}
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <button 
          v-if="isFromSaved"
          class="btn btn-ghost" 
          @click="deleteCurrentResult"
          :disabled="isDeleting"
        >
          <span v-if="isDeleting" class="loading loading-spinner loading-sm mr-2"></span>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          {{ isDeleting ? '删除中...' : '删除' }}
        </button>
        <button 
          v-else
          class="btn btn-ghost" 
          @click="discardResults"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          舍弃结果
        </button>
        
        <button 
          v-if="isFromSaved"
          class="btn btn-ghost" 
          @click="exportResults"
          :disabled="isExporting"
        >
          <span v-if="isExporting" class="loading loading-spinner loading-sm mr-2"></span>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          {{ isExporting ? '导出中...' : '导出' }}
        </button>
        <button 
          v-else
          class="btn btn-ghost" 
          @click="saveResults" 
          :disabled="isSaving"
        >
          <span v-if="isSaving" class="loading loading-spinner loading-sm mr-2"></span>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
          </svg>
          {{ isSaving ? '保存中...' : '保存结果' }}
        </button>
      </div>
    </div>

    <!-- Generation summary -->
    <div class="card bg-white">
      <div class="card-body">
        <h2 class="card-title text-lg mb-4">生成概览</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">总题数</div>
            <div class="stat-value text-2xl">{{ exercises.length }}</div>
            <div class="stat-desc">道习题</div>
          </div>
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">题型分布</div>
            <div class="stat-value text-lg">{{ getQuestionTypeStats() }}</div>
            <div class="stat-desc">{{ exercises.length > 0 ? getQuestionTypeText(exercises[0].question_type) : '-' }}</div>
          </div>
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">难度分布</div>
            <div class="stat-value text-lg">{{ getDifficultyStats() }}</div>
            <div class="stat-desc">{{ exercises.length > 0 ? getDifficultyText(exercises[0].difficulty) : '-' }}</div>
          </div>
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">生成时间</div>
            <div class="stat-value text-lg">{{ formatTime(generatedAt) }}</div>
            <div class="stat-desc">刚刚</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Exercise list -->
    <div class="card bg-white">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title">习题列表</h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-base-content/60">共 {{ exercises.length }} 道题</span>
          </div>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(exercise, index) in exercises" 
            :key="exercise.id"
            class="border border-base-300 rounded-lg p-4 hover:bg-base-50 transition-colors"
          >
            <!-- Exercise header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="badge badge-primary">第 {{ index + 1 }} 题</span>
                <span class="badge badge-outline">{{ getQuestionTypeText(exercise.question_type) }}</span>
                <span class="badge badge-outline">{{ getDifficultyText(exercise.difficulty) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn btn-ghost btn-xs" @click="editExercise(exercise)">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button class="btn btn-ghost btn-xs text-error" @click="removeExercise(exercise.id)">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Exercise content -->
            <div class="space-y-3">
              <div>
                <h4 class="font-medium text-base-content mb-2">题目内容：</h4>
                <p class="text-base-content/80 leading-relaxed pl-4 border-l-2 border-base-300">
                  {{ exercise.content }}
                </p>
              </div>

              <!-- Choices for multiple choice questions -->
              <div v-if="exercise.choices && exercise.choices.length > 0">
                <h4 class="font-medium text-base-content mb-2">选项：</h4>
                <div class="space-y-1 pl-4">
                  <div v-for="(choice, choiceIndex) in exercise.choices" :key="choiceIndex" class="text-base-content/80">
                    {{ String.fromCharCode(65 + choiceIndex) }}. {{ choice }}
                  </div>
                </div>
              </div>

              <!-- Answer -->
              <div>
                <h4 class="font-medium text-base-content mb-2">参考答案：</h4>
                <div class="bg-base-200 rounded-lg p-3">
                  <p class="text-base-content/80 leading-relaxed">{{ exercise.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="exercises.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="text-lg font-medium text-base-content/60 mb-2">暂无习题</h3>
          <p class="text-base-content/40">请返回重新生成习题</p>
        </div>
      </div>
    </div>

    <!-- 确认舍弃弹窗 -->
    <div v-if="showDiscardModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">确认舍弃</h3>
        <p class="text-base-content/70 mb-6">确定要舍弃这些生成的习题吗？此操作不可撤销。</p>
        <div class="modal-action">
          <button class="btn" @click="showDiscardModal = false">取消</button>
          <button class="btn btn-error" @click="confirmDiscard">确认舍弃</button>
        </div>
      </div>
      <div class="modal-backdrop" @click="showDiscardModal = false"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  type Exercise, 
  type ExerciseGenerationResult as ExerciseResult,
  mockExerciseResults, 
  getDifficultyText, 
  getQuestionTypeText,
  addSavedExerciseResult,
  getSavedExerciseResult,
  deleteSavedExerciseResult,
  type SavedExerciseResult
} from '../data/mockExercises'
import { mockOutlineDetails } from '../data/mockOutlines'

// 路由
const router = useRouter()
const route = useRoute()

// 响应式数据
const exercises = ref<Exercise[]>([])
const outlineTitle = ref('')
const generatedAt = ref(new Date().toISOString())
const isSaving = ref(false)
const isDeleting = ref(false)
const isExporting = ref(false)
const showDiscardModal = ref(false)
const showDeleteModal = ref(false)
const isFromSaved = ref(false)
const savedResultId = ref<string | null>(null)

// 计算属性
const outlineId = computed(() => {
  return route.query.outlineId ? parseInt(route.query.outlineId as string) : null
})

const savedId = computed(() => {
  return route.query.savedId as string || null
})

const isEditMode = computed(() => {
  return route.query.edit === 'true'
})

// 获取题型统计
const getQuestionTypeStats = () => {
  if (exercises.value.length === 0) return '0'
  const types = new Set(exercises.value.map(e => e.question_type))
  return types.size.toString()
}

// 获取难度统计
const getDifficultyStats = () => {
  if (exercises.value.length === 0) return '0'
  const difficulties = new Set(exercises.value.map(e => e.difficulty))
  return difficulties.size.toString()
}

// 格式化时间
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

// 返回上一页
const goBack = () => {
  router.push({ name: 'ExerciseAssistant' })
}

// 编辑习题
const editExercise = (exercise: Exercise) => {
  // TODO: 实现编辑功能
  console.log('编辑习题:', exercise)
}

// 移除习题
const removeExercise = (exerciseId: number) => {
  exercises.value = exercises.value.filter(e => e.id !== exerciseId)
}

// 舍弃结果
const discardResults = () => {
  showDiscardModal.value = true
}

// 确认舍弃
const confirmDiscard = () => {
  showDiscardModal.value = false
  router.push({ name: 'ExerciseAssistant' })
}

// 保存结果
const saveResults = async () => {
  if (exercises.value.length === 0) {
    alert('没有可保存的习题')
    return
  }

  isSaving.value = true
  
  // 模拟保存API调用
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  try {
    // 如果是从保存的结果进来的，则不需要重新保存
    if (isFromSaved.value) {
      alert('习题已保存')
    } else {
      // 创建保存的结果
      const exerciseResult = {
        lesson_plan_id: outlineId.value!,
        outline_title: outlineTitle.value,
        exercises: exercises.value,
        created_at: generatedAt.value
      }
      
      addSavedExerciseResult(exerciseResult)
      alert('习题保存成功！')
    }
    
    // 返回习题助手页面
    router.push({ name: 'ExerciseAssistant' })
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请重试')
  } finally {
    isSaving.value = false
  }
}

// 删除当前结果
const deleteCurrentResult = () => {
  if (!savedResultId.value) return
  
  if (confirm('确定要删除这个习题结果吗？此操作不可撤销。')) {
    isDeleting.value = true
    
    // 模拟删除API调用
    setTimeout(() => {
      const success = deleteSavedExerciseResult(savedResultId.value!)
      if (success) {
        alert('习题删除成功！')
        router.push({ name: 'ExerciseAssistant' })
      } else {
        alert('删除失败，请重试')
      }
      isDeleting.value = false
    }, 1000)
  }
}

// 导出结果
const exportResults = async () => {
  if (exercises.value.length === 0) {
    alert('没有可导出的习题')
    return
  }

  isExporting.value = true
  
  try {
    // 准备导出数据
    const exportData = {
      title: outlineTitle.value,
      exercises: exercises.value.map((exercise, index) => ({
        序号: index + 1,
        题型: getQuestionTypeText(exercise.question_type),
        难度: getDifficultyText(exercise.difficulty),
        题目: exercise.content,
        答案: exercise.answer,
        选项: exercise.choices?.join(' | ') || ''
      })),
      导出时间: new Date().toLocaleString('zh-CN'),
      总题数: exercises.value.length
    }
    
    // 模拟导出延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 创建并下载JSON文件
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${outlineTitle.value}_习题集_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert('习题导出成功！')
  } catch (error) {
    console.error('导出失败:', error)
    alert('导出失败，请重试')
  } finally {
    isExporting.value = false
  }
}

// 加载生成的习题
const loadExercises = () => {
  // 如果有保存的结果ID，则加载保存的结果
  if (savedId.value) {
    const savedResult = getSavedExerciseResult(savedId.value)
    if (savedResult) {
      outlineTitle.value = savedResult.outline_title
      exercises.value = savedResult.exercises
      generatedAt.value = savedResult.created_at
      isFromSaved.value = true
      savedResultId.value = savedResult.id
      return
    }
  }
  
  // 否则加载新生成的结果
  if (outlineId.value) {
    // 获取大纲标题
    const outline = mockOutlineDetails[outlineId.value]
    if (outline) {
      outlineTitle.value = outline.title
    }
    
    // 加载模拟的习题数据
    const result = mockExerciseResults.find(r => r.lesson_plan_id === outlineId.value)
    if (result) {
      exercises.value = result.exercises
      generatedAt.value = result.created_at
    }
    
    isFromSaved.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadExercises()
})
</script>