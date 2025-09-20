<template>
  <div class="drawer lg:drawer-open">
    <!-- Drawer toggle for mobile -->
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Main content area -->
    <div class="drawer-content flex flex-col">
      <!-- Top navbar for mobile -->
      <div class="navbar lg:hidden bg-base-100 shadow-md">
        <div class="flex-none">
          <label for="dashboard-drawer" class="btn btn-square btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-semibold">仪表盘</h1>
        </div>
      </div>
      
      <!-- Page content -->
      <main class="flex-1 p-4 lg:p-6">
        <RouterView />
      </main>
    </div>

    <!-- Sidebar -->
    <div class="drawer-side">
      <label for="dashboard-drawer" class="drawer-overlay"></label>
      <aside class="min-h-full w-64 bg-base-200">
        <!-- Sidebar header -->
        <div class="p-4 border-b border-base-300">
          <h2 class="text-lg font-bold">CurioCloud</h2>
        </div>
        
        <!-- Navigation menu -->
        <nav class="p-4">
          <ul class="menu menu-vertical w-full">
            <li>
              <router-link 
                to="/dashboard/home" 
                class="flex items-center gap-3"
                active-class="active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                主页
              </router-link>
            </li>
            <li>
              <router-link 
                to="/dashboard/teaching-design" 
                class="flex items-center gap-3"
                active-class="active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                教学设计
              </router-link>
            </li>
            <li>
              <router-link 
                to="/dashboard/teaching-resources" 
                class="flex items-center gap-3"
                active-class="active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m-1 1v1h1m-1-1H4m1 1H4v1"></path>
                </svg>
                教学资源
              </router-link>
            </li>
            <li>
              <router-link 
                to="/dashboard/exercise-assistant" 
                class="flex items-center gap-3"
                active-class="active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                习题助手
              </router-link>
            </li>
            <li>
              <router-link 
                to="/dashboard/learning-analysis" 
                class="flex items-center gap-3"
                active-class="active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                学情分析
              </router-link>
            </li>
          </ul>
        </nav>
        
        <!-- Sidebar footer -->
        <div class="absolute bottom-0 w-full p-4 border-t border-base-300">
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                <span class="text-xs">U</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">用户</p>
              <p class="text-xs text-base-content/60">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
// 仪表盘布局组件
// 使用 daisyUI drawer 组件实现侧边栏导航
</script>

<style scoped>
/* 自定义菜单项的高亮样式 */
.menu li > a.active {
  background-color: oklch(75% 0.183 55.934);
  color: oklch(98% 0.003 247.858);
  font-weight: 500;
}

.menu li > a.active svg {
  color: oklch(98% 0.003 247.858);
}

/* 悬停效果 */
.menu li > a:hover:not(.active) {
  background-color: oklch(91.586% 0.006 53.44);
}
</style>