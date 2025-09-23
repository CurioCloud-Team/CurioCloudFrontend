<template>
  <div v-if="outline" class="space-y-6">
    <!-- Breadcrumb navigation -->
    <div class="breadcrumbs text-sm">
      <ul>
        <li>
          <router-link to="/dashboard/teaching-design" class="link link-hover">
            教学设计
          </router-link>
        </li>
        <li>教学大纲详情</li>
      </ul>
    </div>

    <!-- Header section -->
    <div class="card bg-white">
      <div class="card-body">
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-start gap-4">
              <div>
                <h1 class="text-2xl font-bold text-base-content mb-2">{{ outline.title }}</h1>
                <div class="flex flex-wrap gap-2 mb-3">
                  <div class="badge badge-primary">{{ outline.subject }}</div>
                  <div class="badge badge-ghost">{{ outline.grade }}</div>
                  <div class="badge badge-ghost">{{ outline.duration }}</div>
                </div>
                <p class="text-base-content/70 text-sm">{{ outline.description }}</p>
              </div>
            </div>
          </div>
          
          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row gap-2">
            <button class="btn btn-outline btn-sm" @click="editOutline">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              编辑
            </button>
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                <li><a @click="deleteOutline" class="text-error">删除</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left column - Main content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Teaching objectives -->
        <div class="card bg-white">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">
              教学目标
            </h2>
            <div class="space-y-3">
              <div v-for="(objective, index) in outline.objectives" :key="index" class="flex items-start gap-3">
                <div class="badge badge-sm badge-primary mt-1">{{ index + 1 }}</div>
                <p class="text-sm leading-relaxed">{{ objective }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Teaching content -->
        <div class="card bg-white">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">
              教学内容
            </h2>
            <div class="space-y-4">
              <div v-for="(content, index) in outline.contents" :key="index" class="border-l-4 border-primary pl-4">
                <h3 class="font-semibold text-base mb-2">{{ content.title }}</h3>
                <p class="text-sm text-base-content/70 leading-relaxed">{{ content.description }}</p>
                <div v-if="content.keyPoints" class="mt-2">
                  <div class="text-xs text-base-content/60 mb-1">重点内容：</div>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="point in content.keyPoints" :key="point" class="badge badge-outline badge-sm">{{ point }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Teaching process -->
        <div class="card bg-white">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">
              教学过程
            </h2>
            <div class="space-y-4">
              <div v-for="(step, index) in outline.process" :key="index" class="timeline-item">
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-semibold">
                      {{ index + 1 }}
                    </div>
                    <div v-if="index < outline.process.length - 1" class="w-px h-full bg-base-300 mt-2"></div>
                  </div>
                  <div class="flex-1 pb-6">
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="font-semibold">{{ step.title }}</h3>
                      <span class="badge badge-ghost badge-sm">{{ step.duration }}</span>
                    </div>
                    <p class="text-sm text-base-content/70 mb-2">{{ step.description }}</p>
                    <div v-if="step.activities" class="space-y-1">
                      <div class="text-xs text-base-content/60">活动安排：</div>
                      <ul class="text-sm space-y-1 ml-4">
                        <li v-for="activity in step.activities" :key="activity" class="flex items-start gap-2">
                          <span class="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{{ activity }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>

  <!-- Loading state -->
  <div v-else class="flex items-center justify-center min-h-[400px]">
    <div class="text-center">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-4 text-base-content/60">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOutlineDetail, type TeachingOutlineDetail } from '../data/mockOutlines'

const route = useRoute()

// 教学大纲数据类型使用从 mockOutlines 导入的类型
// 响应式数据
const outline = ref<TeachingOutlineDetail | null>(null)

// 方法
const getSubjectIcon = (subject: string) => {
  const iconMap: Record<string, string> = {
    '数学': '数',
    '语文': '语',
    '英语': 'En',
    '科学': '科'
  }
  return iconMap[subject] || '教'
}

const editOutline = () => {
  console.log('编辑教学大纲')
  // 跳转到编辑页面
}

const shareOutline = () => {
  console.log('分享教学大纲')
  // 实现分享功能
}

const duplicateOutline = () => {
  console.log('复制教学大纲')
  // 实现复制功能
}

const exportOutline = () => {
  console.log('导出教学大纲')
  // 实现导出功能
}

const deleteOutline = () => {
  console.log('删除教学大纲')
  // 实现删除功能，显示确认对话框
}

const downloadResource = (resource: any) => {
  console.log('下载资源:', resource)
  // 实现资源下载功能
}

// 生命周期
onMounted(() => {
  // 根据路由参数获取教学大纲ID，然后获取详细数据
  const outlineId = route.params.id
  if (outlineId) {
    const id = parseInt(outlineId as string)
    outline.value = getOutlineDetail(id)
    
    if (!outline.value) {
      console.error('未找到对应的教学大纲')
      // 实际项目中可以跳转到404页面或显示错误信息
    }
  }
})
</script>

<style scoped>
.timeline-item {
  position: relative;
}
</style>