<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">学情分析</h1>
        <p class="text-base-content/60 mt-1">深入了解学生学习情况，优化教学策略</p>
      </div>
      <button class="btn btn-primary">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        生成报告
      </button>
    </div>

    <!-- Overview stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-primary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
        <div class="stat-title">学生总数</div>
        <div class="stat-value text-primary">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-secondary">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="stat-title">平均成绩</div>
        <div class="stat-value text-secondary">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-accent">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        </div>
        <div class="stat-title">进步率</div>
        <div class="stat-value text-accent">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>

      <div class="stat bg-base-100 shadow-md rounded-lg">
        <div class="stat-figure text-info">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="stat-title">活跃度</div>
        <div class="stat-value text-info">--</div>
        <div class="stat-desc">数据加载中...</div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Performance trends -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title">成绩趋势</h2>
              <div class="flex gap-2">
                <select class="select select-bordered select-sm">
                  <option>最近一周</option>
                  <option>最近一月</option>
                  <option>最近三月</option>
                </select>
              </div>
            </div>
            <div class="h-64 flex items-center justify-center text-base-content/60">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p>暂无成绩数据</p>
                <p class="text-sm">数据收集中...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Subject performance -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title mb-4">各科成绩分析</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-base-300 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span class="text-xs font-semibold text-primary">语</span>
                  </div>
                  <div>
                    <h3 class="font-semibold">语文</h3>
                    <p class="text-sm text-base-content/60">平均分：-- 分</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="badge badge-outline">优秀率：--%</div>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border border-base-300 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span class="text-xs font-semibold text-secondary">数</span>
                  </div>
                  <div>
                    <h3 class="font-semibold">数学</h3>
                    <p class="text-sm text-base-content/60">平均分：-- 分</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="badge badge-outline">优秀率：--%</div>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border border-base-300 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span class="text-xs font-semibold text-accent">英</span>
                  </div>
                  <div>
                    <h3 class="font-semibold">英语</h3>
                    <p class="text-sm text-base-content/60">平均分：-- 分</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="badge badge-outline">优秀率：--%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-6">
        <!-- Analysis tools -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-base mb-4">分析工具</h2>
            <div class="space-y-3">
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                成绩分布图
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                进步趋势图
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                个人报告
              </button>
              <button class="btn btn-outline btn-block justify-start">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                班级对比
              </button>
            </div>
          </div>
        </div>

        <!-- Grade distribution -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-base mb-4">成绩分布</h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm">优秀 (90-100)</span>
                <div class="badge badge-success">--%</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">良好 (80-89)</span>
                <div class="badge badge-info">--%</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">中等 (70-79)</span>
                <div class="badge badge-warning">--%</div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">待提高 (<70)</span>
                <div class="badge badge-error">--%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Learning insights -->
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title text-base mb-4">学习洞察</h2>
            <div class="space-y-3">
              <div class="alert alert-info">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm">等待数据分析...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 学情分析页面
</script>