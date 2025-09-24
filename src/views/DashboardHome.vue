<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">仪表盘首页</h1>
        <p class="text-base-content/60 mt-1">欢迎回到 CurioCloud 控制中心</p>
      </div>
      <div class="text-sm text-base-content/60">
        {{ currentDate }}
      </div>
    </div>

    <!-- Stats cards row -->

    <!-- Main content cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left column -->
      <div class="space-y-6">
        <!-- Recent activity card -->
        <div class="card bg-white">
          <div class="card-body">
            <h2 class="card-title">最近活动</h2>
            <div class="text-base-content/60">
              <p>暂无活动记录</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-6">


        <!-- Notifications card -->
        <div class="card bg-white">
          <div class="card-body">
            <h2 class="card-title">通知</h2>
            <div class="text-base-content/60">
              <p>暂无新通知</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 当前日期
const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})
</script>