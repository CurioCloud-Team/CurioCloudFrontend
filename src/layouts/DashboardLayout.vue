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
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-8 rounded-full bg-neutral-focus text-neutral-content flex items-center justify-center">
                <span class="text-xs font-medium">{{ userInfo?.username?.charAt(0).toUpperCase() || 'U' }}</span>
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a class="justify-between">
                  {{ userInfo?.username || '用户' }}
                  <span class="badge">在线</span>
                </a>
              </li>
              <li><button @click="goToProfile">个人资料</button></li>
              <li><button @click="goToSettings">设置</button></li>
              <li><button @click="handleLogout" class="text-error">退出登录</button></li>
            </ul>
          </div>
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
          <div class="dropdown dropdown-top dropdown-end">
            <div 
              tabindex="0" 
              role="button" 
              class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-base-300 cursor-pointer transition-colors"
            >
              <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span class="text-xs">{{ userInfo?.username?.charAt(0).toUpperCase() || 'U' }}</span>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ userInfo?.username || '用户' }}</p>
                <p class="text-xs text-base-content/60">{{ userInfo?.email || 'user@example.com' }}</p>
              </div>
              <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
              <li>
                <button @click="goToProfile" class="flex items-center gap-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  个人资料
                </button>
              </li>
              <li>
                <button @click="goToSettings" class="flex items-center gap-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  设置
                </button>
              </li>
              <div class="divider my-1"></div>
              <li>
                <button 
                  @click="handleLogout" 
                  class="flex items-center gap-3 text-error hover:bg-error hover:text-error-content"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  退出登录
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { userInfo, initAuth, safeLogout } = useAuth()

// 组件挂载时初始化认证状态
onMounted(() => {
  initAuth()
})

// 跳转到个人资料页面
const goToProfile = () => {
  // TODO: 实现个人资料页面路由
  console.log('跳转到个人资料')
  // router.push('/dashboard/profile')
}

// 跳转到设置页面
const goToSettings = () => {
  // TODO: 实现设置页面路由
  console.log('跳转到设置')
  // router.push('/dashboard/settings')
}

// 处理退出登录
const handleLogout = () => {
  safeLogout('确定要退出登录吗？')
}
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