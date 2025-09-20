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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-primary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
        <div class="stat-title">总用户数</div>
        <div class="stat-value text-primary">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-secondary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div class="stat-title">数据统计</div>
        <div class="stat-value text-secondary">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-accent">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="stat-title">活跃度</div>
        <div class="stat-value text-accent">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-info">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
        <div class="stat-title">收益</div>
        <div class="stat-value text-info">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>
    </div>

    <!-- Main content cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left column -->
      <div class="space-y-6">
        <!-- Recent activity card -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title">最近活动</h2>
            <div class="text-base-content/60">
              <p>暂无活动记录</p>
            </div>
          </div>
        </div>

        <!-- Quick actions card -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title">快捷操作</h2>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <button class="btn btn-outline btn-primary">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                新建项目
              </button>
              <button class="btn btn-outline btn-secondary">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                生成报告
              </button>
              <button class="btn btn-outline btn-accent">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
                系统设置
              </button>
              <button class="btn btn-outline btn-info">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                数据导出
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-6">
        <!-- System status card -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title">系统状态</h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span>API 服务</span>
                <div class="badge badge-success">正常</div>
              </div>
              <div class="flex items-center justify-between">
                <span>数据库</span>
                <div class="badge badge-success">正常</div>
              </div>
              <div class="flex items-center justify-between">
                <span>缓存系统</span>
                <div class="badge badge-success">正常</div>
              </div>
              <div class="flex items-center justify-between">
                <span>文件存储</span>
                <div class="badge badge-warning">检查中</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications card -->
        <div class="card bg-base-100 shadow-md">
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