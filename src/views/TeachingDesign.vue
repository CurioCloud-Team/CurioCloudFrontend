<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">教学设计</h1>
        <p class="text-base-content/60 mt-1">创建和管理您的教学设计方案</p>
      </div>
      <button class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        新建设计
      </button>
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-primary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <div class="stat-title">总设计数</div>
        <div class="stat-value text-primary">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-secondary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="stat-title">已完成</div>
        <div class="stat-value text-secondary">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-accent">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="stat-title">进行中</div>
        <div class="stat-value text-accent">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Recent designs -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title">最近的设计</h2>
              <button class="btn btn-ghost btn-sm">查看全部</button>
            </div>
            <div class="text-base-content/60">
              <p>暂无教学设计记录</p>
            </div>
          </div>
        </div>

        <!-- Design templates -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title mb-4">设计模板</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="border border-base-300 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <h3 class="font-semibold">传统课堂模板</h3>
                </div>
                <p class="text-sm text-base-content/60">适用于常规课堂教学的设计模板</p>
              </div>
              
              <div class="border border-base-300 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 class="font-semibold">混合式教学模板</h3>
                </div>
                <p class="text-sm text-base-content/60">线上线下结合的教学设计模板</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-6">
        <!-- Quick actions -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title mb-4">快捷操作</h2>
            <div class="space-y-3">
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                创建新设计
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
                导入设计
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                分享设计
              </button>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title mb-4">设计分类</h2>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span>语文</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span>数学</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span>英语</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span>科学</span>
                <div class="badge badge-outline">--</div>
              </div>
              <div class="flex items-center justify-between">
                <span>其他</span>
                <div class="badge badge-outline">--</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 教学设计页面
</script>