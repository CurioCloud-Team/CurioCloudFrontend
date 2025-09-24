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
        <h3 class="font-bold text-lg mb-4">选择教学大纲</h3>
        <div class="form-control mb-4">
          <input 
            type="text" 
            placeholder="搜索教学大纲..." 
            class="input input-bordered"
            v-model="outlineSearchKeyword"
          />
        </div>
        <div class="max-h-96 overflow-y-auto space-y-2">
          <div 
            v-for="outline in filteredOutlines" 
            :key="outline.id"
            class="card bg-base-200 shadow-sm hover:shadow cursor-pointer transition-shadow"
            :class="{ 'ring-2 ring-primary': selectedOutlineId === outline.id }"
            @click="selectedOutlineId = outline.id"
          >
            <div class="card-body p-4">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="font-semibold mb-1">{{ outline.title }}</h4>
                  <p class="text-sm text-base-content/60 mb-2">{{ outline.subject }} · {{ outline.grade }}</p>
                  <p class="text-xs text-base-content/60">{{ outline.description }}</p>
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
import { mockOutlineDetails } from '../data/mockOutlines'
import { savedPPTs as mockSavedPPTs, type SavedPPT } from '../data/mockPPTs'

const router = useRouter()

// 响应式数据
const showOutlineSelector = ref(false)
const selectedOutlineId = ref<number | null>(null)
const outlineSearchKeyword = ref('')
const searchKeyword = ref('')
const sortBy = ref('createTime')

// 模拟保存的PPT数据
const savedPPTs = ref<SavedPPT[]>(mockSavedPPTs)

// 计算属性
const outlines = computed(() => Object.values(mockOutlineDetails))

const filteredOutlines = computed(() => {
  if (!outlineSearchKeyword.value) return outlines.value
  return outlines.value.filter(outline => 
    outline.title.includes(outlineSearchKeyword.value) ||
    outline.subject.includes(outlineSearchKeyword.value) ||
    outline.description.includes(outlineSearchKeyword.value)
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
const generatePPT = () => {
  if (selectedOutlineId.value) {
    showOutlineSelector.value = false
    // 跳转到PPT生成页面
    router.push(`/dashboard/ppt-generation/${selectedOutlineId.value}`)
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
  // 页面加载时的初始化操作
})
</script>