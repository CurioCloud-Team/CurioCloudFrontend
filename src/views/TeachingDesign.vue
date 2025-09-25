<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">教学设计</h1>
        <p class="text-base-content/60 mt-1">创建和管理您的教案</p>
      </div>
      <button class="btn btn-soft" @click="createNewOutline">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        新建教案
      </button>
    </div>

    <!-- Search and filters -->
    <div class="card bg-base-100">
      <div>
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search input -->
          <div class="flex-1">
            <div class="form-control">
              <div class="input-group flex gap-2">
                <input 
                  type="text" 
                  placeholder="搜索教案.." 
                  class="input input-bordered flex-1"
                  v-model="searchQuery"
                  @input="handleSearch"
                />
                <button class="btn btn-square" @click="handleSearch">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Filters -->
          <div class="flex gap-2">
            <select class="select select-bordered" v-model="selectedSubject" @change="handleFilter">
              <option value="">全部学科</option>
              <option v-for="subject in availableSubjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
            <select class="select select-bordered" v-model="sortBy" @change="handleSort">
              <option value="latest">最新创建</option>
              <option value="modified">最近修改</option>
              <option value="name">按名称排序</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Teaching outline list -->
    <div class="card bg-base-100">
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="card-title">
            教案列表
            <span class="text-sm font-normal text-base-content/60" v-if="filteredLessonPlansCount">
              ({{ filteredLessonPlansCount }} 个结果)
            </span>
          </h2>
          <button class="btn btn-ghost btn-sm" @click="clearFilters" v-if="hasActiveFilters">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            清除筛选
          </button>
        </div>

        <!-- Outline items container -->
        <div class="space-y-4">
          <div 
            v-for="plan in filteredLessonPlans" 
            :key="plan.id"
            class="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-base-50"
            @click="previewOutline(plan)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-semibold text-lg">{{ plan.title }}</h3>
                  <div class="badge badge-sm" :class="getSubjectBadgeClass(plan.subject)">
                    {{ plan.subject }}
                  </div>
                  <div class="badge badge-outline badge-sm">{{ plan.grade }}</div>
                </div>
                <div class="flex items-center gap-4 text-xs text-base-content/60">
                  <span>创建时间：{{ formatDate(plan.created_at) }}</span>
                </div>
              </div>
              <div class="flex gap-2 ml-4" @click.stop>
                <button class="btn btn-ghost btn-sm" @click="previewOutline(plan)">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  预览
                </button>
              </div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-center py-4">
            <span class="loading loading-spinner loading-md"></span>
            <span class="ml-2 text-sm text-base-content/60">加载中...</span>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredLessonPlans.length === 0 && !isLoading" class="text-center text-base-content/60 py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <p class="text-lg mb-2">
            {{ hasActiveFilters ? '未找到匹配的教案' : '暂无教案' }}
          </p>
          <p class="text-sm">
            {{ hasActiveFilters ? '尝试调整搜索条件或筛选器' : '点击上方"新建教案"按钮开始创建您的第一个教案' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getLessonPlansAPI } from '@/services/teaching'
import type { LessonPlanListResponse } from '@/types/teaching'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const selectedSubject = ref('')
const sortBy = ref('latest')
const lessonPlans = ref<LessonPlanListResponse[]>([])
const isLoading = ref(true)
const error = ref('')

// 计算属性
const filteredLessonPlans = computed(() => {
  let filtered = [...lessonPlans.value]

  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(plan =>
      plan.title.toLowerCase().includes(query) ||
      plan.subject.toLowerCase().includes(query) ||
      plan.grade.toLowerCase().includes(query)
    )
  }

  // 按学科过滤
  if (selectedSubject.value) {
    filtered = filtered.filter(plan => plan.subject === selectedSubject.value)
  }

  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'latest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'name':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return filtered
})

const filteredLessonPlansCount = computed(() => filteredLessonPlans.value.length)

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedSubject.value !== ''
})

// 获取所有唯一的学科
const availableSubjects = computed(() => {
  const subjects = lessonPlans.value.map(plan => plan.subject)
  return [...new Set(subjects)].sort()
})

// 方法
const loadLessonPlans = async () => {
  try {
    isLoading.value = true
    error.value = ''
    const response = await getLessonPlansAPI()
    lessonPlans.value = response
  } catch (err) {
    console.error('加载教案列表失败:', err)
    error.value = '加载教案列表失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  // 搜索是实时的，通过计算属性处理
}

const handleFilter = () => {
  // 筛选是实时的，通过计算属性处理
}

const handleSort = () => {
  // 排序是实时的，通过计算属性处理
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedSubject.value = ''
}

const getSubjectBadgeClass = (subject: string) => {
  const classMap: Record<string, string> = {
    '数学': 'badge-primary',
    '语文': 'badge-secondary',
    '英语': 'badge-accent',
    '科学': 'badge-info'
  }
  return classMap[subject] || 'badge-neutral'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 操作方法
const createNewOutline = () => {
  router.push('/dashboard/teaching-design/start')
}

const previewOutline = (plan: LessonPlanListResponse) => {
  router.push(`/dashboard/teaching-design/plan/${plan.id}`)
}

// 生命周期
onMounted(() => {
  loadLessonPlans()
})
</script>