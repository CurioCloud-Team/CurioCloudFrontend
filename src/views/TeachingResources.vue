<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">教学资源</h1>
        <p class="text-base-content/60 mt-1">管理和共享您的教学资源</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-soft" @click="showOutlineSelector = true">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          AI 生成 PPT
        </button>
      </div>
    </div>

    <!-- PPT Resources Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="stat bg-white rounded-lg">
        <div class="stat-figure text-primary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div class="stat-title">PPT 总数</div>
        <div class="stat-value text-primary">{{ savedPPTs.length }}</div>
        <div class="stat-desc">已保存的 PPT 文件</div>
      </div>

      <div class="stat bg-white rounded-lg">
        <div class="stat-figure text-secondary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="stat-title">生成中</div>
        <div class="stat-value text-secondary">0</div>
        <div class="stat-desc">正在生成的 PPT</div>
      </div>

      <div class="stat bg-white rounded-lg">
        <div class="stat-figure text-accent">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="stat-title">最近生成</div>
        <div class="stat-value text-accent">{{ recentCount }}</div>
        <div class="stat-desc">近7天生成数量</div>
      </div>
    </div>

    <!-- PPT Resource List -->
    <div class="card bg-white">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h3 class="card-title">已保存的 PPT</h3>
          <div class="flex gap-2">
            <input 
              type="text" 
              placeholder="搜索 PPT..." 
              class="input input-bordered input-sm"
              v-model="searchKeyword"
            />
            <select class="select select-bordered select-sm" v-model="sortBy">
              <option value="createTime">创建时间</option>
              <option value="title">标题</option>
              <option value="subject">学科</option>
            </select>
          </div>
        </div>

        <!-- PPT Grid -->
        <div v-if="filteredPPTs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="ppt in filteredPPTs" 
            :key="ppt.id" 
            class="card bg-base-200 shadow hover:shadow-lg transition-shadow cursor-pointer"
            @click="viewPPT(ppt)"
          >
            <div class="card-body p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-semibold text-sm mb-1 line-clamp-2">{{ ppt.title }}</h4>
                  <p class="text-xs text-base-content/60 mb-2">{{ ppt.subject }} · {{ ppt.grade }}</p>
                  <div class="flex items-center gap-2 text-xs text-base-content/60">
                    <span>{{ ppt.slideCount }} 页</span>
                    <span>·</span>
                    <span>{{ formatDate(ppt.createTime) }}</span>
                  </div>
                </div>
                <div class="dropdown dropdown-end">
                  <button class="btn btn-ghost btn-xs btn-circle" @click.stop="$event.preventDefault()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                  <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                    <li><a @click.stop="downloadPPT(ppt)">下载</a></li>
                    <li><a @click.stop="deletePPT(ppt.id)">删除</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center text-base-content/60 py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <p class="text-lg mb-2">暂无 PPT 资源</p>
          <p class="text-sm">点击「AI 生成 PPT」开始创建您的第一个课件</p>
        </div>
      </div>
    </div>

    <!-- Outline Selector Modal -->
    <div v-if="showOutlineSelector" class="modal modal-open">
      <div class="modal-box w-11/12 max-w-2xl">
        <h3 class="font-bold text-lg mb-4">选择教案</h3>
        <div class="form-control mb-4">
          <input 
            type="text" 
            placeholder="搜索教案..." 
            class="input input-bordered"
            v-model="outlineSearchKeyword"
          />
        </div>
        <div class="max-h-96 overflow-y-auto space-y-2">
          <!-- 加载状态 -->
          <div v-if="isLoadingLessonPlans" class="text-center py-8">
            <div class="loading loading-spinner loading-lg text-primary"></div>
            <p class="mt-4 text-base-content/60">正在加载教案列表...</p>
          </div>
          
          <!-- 错误状态 -->
          <div v-else-if="lessonPlansError" class="text-center py-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p class="text-error mb-4">{{ lessonPlansError }}</p>
            <button class="btn btn-primary btn-sm" @click="loadLessonPlans">重试</button>
          </div>
          
          <!-- 教案列表 -->
          <div v-else-if="filteredOutlines.length > 0" class="space-y-4">
            <div 
              v-for="outline in filteredOutlines" 
              :key="outline.id"
              class="card bg-base-200 shadow-sm hover:shadow cursor-pointer transition-shadow border-2"
              :class="{ 
                'border-primary ring-2 ring-primary/20': selectedOutlineId === outline.id,
                'border-base-300': selectedOutlineId !== outline.id
              }"
              @click="selectedOutlineId = outline.id"
            >
              <div class="card-body p-4">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold mb-1">{{ outline.title }}</h4>
                    <p class="text-sm text-base-content/60 mb-2">{{ outline.subject }} · {{ outline.grade }}</p>
                    <p class="text-xs text-base-content/60">创建时间: {{ formatDate(outline.created_at) }}</p>
                  </div>
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      :value="outline.id" 
                      v-model="selectedOutlineId"
                      class="radio radio-primary"
                      @click.stop
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else class="text-center py-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-lg mb-2">暂无教案</p>
            <p class="text-sm text-base-content/60">请先创建教案后再进行PPT生成</p>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showOutlineSelector = false">取消</button>
          <button 
            class="btn btn-primary" 
            :disabled="!selectedOutlineId"
            @click="generatePPT"
          >
            生成 PPT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { savedPPTs as mockSavedPPTs, type SavedPPT } from '../data/mockPPTs'
import { generatePPTFromLessonPlanAPI, getLessonPlansAPI } from '@/services/teaching'
import type { LessonPlanListResponse } from '@/types/teaching'

const router = useRouter()

// 响应式数据
const showOutlineSelector = ref(false)
const selectedOutlineId = ref<number | null>(null)
const outlineSearchKeyword = ref('')
const searchKeyword = ref('')
const sortBy = ref('createTime')

// 教案数据
const lessonPlans = ref<LessonPlanListResponse[]>([])
const isLoadingLessonPlans = ref(false)
const lessonPlansError = ref<string | null>(null)

// 模拟保存的PPT数据
const savedPPTs = ref<SavedPPT[]>(mockSavedPPTs)

// 计算属性
const outlines = computed(() => lessonPlans.value)

const filteredOutlines = computed(() => {
  if (!outlineSearchKeyword.value) return outlines.value
  return outlines.value.filter(outline => 
    outline.title.includes(outlineSearchKeyword.value) ||
    outline.subject.includes(outlineSearchKeyword.value)
  )
})

const filteredPPTs = computed(() => {
  let result = savedPPTs.value
  
  // 搜索过滤
  if (searchKeyword.value) {
    result = result.filter(ppt => 
      ppt.title.includes(searchKeyword.value) ||
      ppt.subject.includes(searchKeyword.value)
    )
  }
  
  // 排序
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'subject':
        return a.subject.localeCompare(b.subject)
      case 'createTime':
      default:
        return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    }
  })
  
  return result
})

const recentCount = computed(() => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return savedPPTs.value.filter(ppt => 
    new Date(ppt.createTime) > sevenDaysAgo
  ).length
})

// 方法
const loadLessonPlans = async () => {
  try {
    isLoadingLessonPlans.value = true
    lessonPlansError.value = null
    const data = await getLessonPlansAPI()
    lessonPlans.value = data
  } catch (error) {
    console.error('加载教案列表失败:', error)
    lessonPlansError.value = '加载教案列表失败，请稍后重试'
  } finally {
    isLoadingLessonPlans.value = false
  }
}

const generatePPT = async () => {
  if (!selectedOutlineId.value) return
  
  try {
    // 调用API生成PPT
    const response = await generatePPTFromLessonPlanAPI(selectedOutlineId.value)
    
    if (response.success && response.ppt_project_id) {
      // 跳转到PPT生成结果页面，传递PPT项目ID
      router.push(`/dashboard/ppt-generation-result/${response.ppt_project_id}`)
    } else {
      // 处理生成失败的情况
      console.error('PPT生成失败:', response.message)
      // 可以在这里显示错误提示
    }
  } catch (error) {
    console.error('生成PPT时出错:', error)
    // 可以在这里显示错误提示
  } finally {
    showOutlineSelector.value = false
  }
}

const viewPPT = (ppt: SavedPPT) => {
  router.push(`/dashboard/ppt-viewer/${ppt.id}`)
}

const downloadPPT = (ppt: any) => {
  // 下载PPT
  console.log('下载PPT:', ppt.downloadUrl)
  // 实际实现中应该处理文件下载
}

const deletePPT = (pptId: number) => {
  const index = savedPPTs.value.findIndex(ppt => ppt.id === pptId)
  if (index > -1) {
    savedPPTs.value.splice(index, 1)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  // 页面加载时获取教案列表
  loadLessonPlans()
})
</script>