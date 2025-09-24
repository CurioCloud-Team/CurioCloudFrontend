<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">教学设计</h1>
        <p class="text-base-content/60 mt-1">创建和管理您的教学大纲</p>
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
                  placeholder="搜索教学大纲..." 
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
              <option value="数学">数学</option>
              <option value="语文">语文</option>
              <option value="英语">英语</option>
              <option value="科学">科学</option>
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
            教学大纲列表
            <span class="text-sm font-normal text-base-content/60" v-if="filteredOutlinesCount">
              ({{ filteredOutlinesCount }} 个结果)
            </span>
          </h2>
          <button class="btn btn-ghost btn-sm" @click="clearFilters" v-if="hasActiveFilters">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            清除筛选
          </button>
        </div>

        <!-- Outline items container with infinite scroll -->
        <div 
          ref="scrollContainer"
          class="space-y-4 overflow-y-auto pr-2"
          @scroll="handleScroll"
        >
          <div 
            v-for="outline in displayedOutlines" 
            :key="outline.id"
            class=" bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-base-50"
            @click="previewOutline(outline)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-semibold text-lg">{{ outline.title }}</h3>
                  <div class="badge badge-sm" :class="getSubjectBadgeClass(outline.subject)">
                    {{ outline.subject }}
                  </div>
                  <div class="badge badge-outline badge-sm">{{ outline.grade }}</div>
                </div>
                <p class="text-sm text-base-content/70 mb-3">
                  {{ outline.description }}
                </p>
                <div class="flex items-center gap-4 text-xs text-base-content/60">
                  <span>创建时间：{{ outline.createTime }}</span>
                  <span>最后修改：{{ outline.modifyTime }}</span>
                  <span>课时：{{ outline.duration }}</span>
                </div>
              </div>
              <div class="flex gap-2 ml-4" @click.stop>
                <button class="btn btn-ghost btn-sm" @click="previewOutline(outline)">
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

          <!-- No more data indicator -->
          <div v-if="!hasMoreData && displayedOutlines.length > 0" class="text-center py-4 text-sm text-base-content/60">
            没有更多数据了
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="displayedOutlines.length === 0 && !isLoading" class="text-center text-base-content/60 py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <p class="text-lg mb-2">
            {{ hasActiveFilters ? '未找到匹配的教学大纲' : '暂无教学大纲' }}
          </p>
          <p class="text-sm">
            {{ hasActiveFilters ? '尝试调整搜索条件或筛选器' : '点击上方"新建教案"按钮开始创建您的第一个教学大纲' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 教学大纲数据类型
interface TeachingOutline {
  id: number
  title: string
  subject: string
  grade: string
  description: string
  createTime: string
  modifyTime: string
  duration: string
}

// 响应式数据
const searchQuery = ref('')
const selectedSubject = ref('')
const sortBy = ref('latest')
const displayedOutlines = ref<TeachingOutline[]>([])
const isLoading = ref(false)
const hasMoreData = ref(true)
const scrollContainer = ref<HTMLElement>()

// 模拟数据 - 实际项目中这些数据会从API获取
const allOutlines = ref<TeachingOutline[]>([
  {
    id: 1,
    title: '《分数的初步认识》教学大纲',
    subject: '数学',
    grade: '三年级',
    description: '本节课通过实际操作和生活实例，让学生初步认识分数的含义，理解分数各部分的名称，能正确读写简单的分数。',
    createTime: '2024-03-15',
    modifyTime: '2024-03-18',
    duration: '1课时'
  },
  {
    id: 2,
    title: '《春天的诗歌》教学大纲',
    subject: '语文',
    grade: '二年级',
    description: '通过朗读春天主题的诗歌，培养学生的语感和审美能力，理解诗歌表达的情感，学会有感情地朗读诗歌。',
    createTime: '2024-03-12',
    modifyTime: '2024-03-16',
    duration: '2课时'
  },
  {
    id: 3,
    title: '《Plants and Animals》教学大纲',
    subject: '英语',
    grade: '四年级',
    description: '学习动植物相关词汇，掌握基本的描述性语句，能够用英语简单描述动植物的特征和习性。',
    createTime: '2024-03-10',
    modifyTime: '2024-03-14',
    duration: '3课时'
  },
  // 添加更多示例数据用于测试无限滚动
  {
    id: 4,
    title: '《小数的加减法》教学大纲',
    subject: '数学',
    grade: '四年级',
    description: '掌握小数加减法的计算方法，能够正确进行小数的加减运算，解决实际问题。',
    createTime: '2024-03-08',
    modifyTime: '2024-03-12',
    duration: '2课时'
  },
  {
    id: 5,
    title: '《我的家乡》教学大纲',
    subject: '语文',
    grade: '三年级',
    description: '通过描写家乡的美景，培养学生的观察能力和表达能力，增强对家乡的热爱之情。',
    createTime: '2024-03-05',
    modifyTime: '2024-03-10',
    duration: '1课时'
  },
  {
    id: 6,
    title: '《Weather and Seasons》教学大纲',
    subject: '英语',
    grade: '三年级',
    description: '学习天气和季节相关词汇，能够用英语描述不同的天气情况和季节特点。',
    createTime: '2024-03-02',
    modifyTime: '2024-03-08',
    duration: '2课时'
  }
])

// 计算属性
const filteredOutlines = computed(() => {
  let filtered = [...allOutlines.value]
  
  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(outline => 
      outline.title.toLowerCase().includes(query) ||
      outline.description.toLowerCase().includes(query) ||
      outline.subject.toLowerCase().includes(query) ||
      outline.grade.toLowerCase().includes(query)
    )
  }
  
  // 按学科过滤
  if (selectedSubject.value) {
    filtered = filtered.filter(outline => outline.subject === selectedSubject.value)
  }
  
  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'latest':
        return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      case 'modified':
        return new Date(b.modifyTime).getTime() - new Date(a.modifyTime).getTime()
      case 'name':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })
  
  return filtered
})

const filteredOutlinesCount = computed(() => filteredOutlines.value.length)

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedSubject.value !== ''
})

// 分页参数
const pageSize = 10
let currentPage = 0

// 方法
const loadMoreData = async () => {
  if (isLoading.value || !hasMoreData.value) return
  
  isLoading.value = true
  
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const newItems = filteredOutlines.value.slice(startIndex, endIndex)
  
  if (newItems.length > 0) {
    displayedOutlines.value.push(...newItems)
    currentPage++
  }
  
  if (endIndex >= filteredOutlines.value.length) {
    hasMoreData.value = false
  }
  
  isLoading.value = false
}

const resetList = () => {
  displayedOutlines.value = []
  currentPage = 0
  hasMoreData.value = true
}

const handleSearch = () => {
  resetList()
  nextTick(() => {
    loadMoreData()
  })
}

const handleFilter = () => {
  resetList()
  nextTick(() => {
    loadMoreData()
  })
}

const handleSort = () => {
  resetList()
  nextTick(() => {
    loadMoreData()
  })
}

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target
  
  // 当滚动到底部附近时加载更多数据
  if (scrollHeight - scrollTop - clientHeight < 100) {
    loadMoreData()
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedSubject.value = ''
  resetList()
  nextTick(() => {
    loadMoreData()
  })
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

// 操作方法
const createNewOutline = () => {
  router.push('/dashboard/teaching-design/start')
}

const previewOutline = (outline: TeachingOutline) => {
  router.push(`/dashboard/teaching-design/outline/${outline.id}`)
}

const editOutline = (outline: TeachingOutline) => {
  console.log('编辑教案:', outline)
}

const copyOutline = (outline: TeachingOutline) => {
  console.log('复制教案:', outline)
}

const shareOutline = (outline: TeachingOutline) => {
  console.log('分享教案:', outline)
}

const deleteOutline = (outline: TeachingOutline) => {
  console.log('删除教案:', outline)
  // 实际项目中这里会显示确认对话框
}

// 生命周期
onMounted(() => {
  loadMoreData()
})
</script>