<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">习题助手</h1>
        <p class="text-base-content/60 mt-1">智能生成和管理习题，提升教学效率</p>
      </div>
      <button class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        智能生成
      </button>
    </div>

    <!-- Feature cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <button class="btn btn-primary btn-sm">开始生成</button>
          </div>
        </div>
      </div>

      <!-- Question bank -->
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div class="card-body">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m-1 1v1h1m-1-1H4m1 1H4v1"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">题库管理</h3>
              <p class="text-sm text-base-content/60">组织和管理习题</p>
            </div>
          </div>
          <p class="text-sm text-base-content/70 mb-4">
            分类管理习题库，支持标签分组、难度标记、知识点关联等功能。
          </p>
          <div class="card-actions">
            <button class="btn btn-secondary btn-sm">管理题库</button>
          </div>
        </div>
      </div>

      <!-- Paper generation -->
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div class="card-body">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">组卷助手</h3>
              <p class="text-sm text-base-content/60">智能组合试卷</p>
            </div>
          </div>
          <p class="text-sm text-base-content/70 mb-4">
            根据教学目标和考试要求，智能组合生成完整试卷，自动匹配题型和难度。
          </p>
          <div class="card-actions">
            <button class="btn btn-accent btn-sm">开始组卷</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column -->
      <div class="lg:col-span-2 space-y-6">
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

        <!-- Quick tools -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title mb-4">快捷工具</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                批量导入题目
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                导出题库
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                题目预览
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                分享题库
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-6">
        <!-- Statistics -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-base mb-4">统计数据</h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm">总题目数</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">选择题</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">填空题</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">问答题</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">试卷数</span>
                <div class="badge badge-outline">--</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subject distribution -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-base mb-4">学科分布</h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm">语文</span>
                <div class="badge badge-primary">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">数学</span>
                <div class="badge badge-secondary">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">英语</span>
                <div class="badge badge-accent">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">科学</span>
                <div class="badge badge-info">--</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-base mb-4">使用提示</h2>
            <div class="text-sm text-base-content/70 space-y-2">
              <p>• 使用智能出题功能可根据教学内容自动生成习题</p>
              <p>• 题库支持按学科、难度、知识点分类管理</p>
              <p>• 组卷助手能智能匹配题型和难度分布</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 习题助手页面
</script>