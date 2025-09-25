<template>
    <div class="p-8">
        <!-- 成功标题区域 -->
        <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-green-700">
                    <g id="thickness=Bold, mode=default, name=symbol_right">
                        <path id="S1" fill-rule="evenodd" clip-rule="evenodd"
                            d="M114.5 18C114.5 18.904 114.233 19.7457 113.775 20.4508L62.2626 102.422C57.702 109.679 47.3564 110.298 41.9634 103.636L6.52077 59.8541C5.8829 59.0775 5.5 58.0835 5.5 57C5.5 54.5147 7.51472 52.5 10 52.5C11.403 52.5 12.656 53.142 13.4812 54.1483L49.377 97.3086C50.4549 98.6047 52.4803 98.4843 53.397 97.0696L106.184 15.6141C106.979 14.3443 108.391 13.5 110 13.5C112.485 13.5 114.5 15.5147 114.5 18Z"
                            fill="currentColor" />
                    </g>
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">登录成功</h1>
            <p class="text-gray-500 mb-6">欢迎回来，{{ userInfo?.username || '用户' }}，你将在 {{ countdown }} 秒后自动跳转</p>

            <!-- 用户信息卡片 -->
            <div v-if="userProfile" class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">用户信息</h3>
                <div class="space-y-3 text-left">
                    <div class="flex justify-between">
                        <span class="text-gray-600">用户名:</span>
                        <span class="font-medium">{{ userProfile.username }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">邮箱:</span>
                        <span class="font-medium">{{ userProfile.email }}</span>
                    </div>
                    <div v-if="userProfile.full_name" class="flex justify-between">
                        <span class="text-gray-600">姓名:</span>
                        <span class="font-medium">{{ userProfile.full_name }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">状态:</span>
                        <span class="font-medium" :class="userProfile.is_active ? 'text-green-600' : 'text-red-600'">
                            {{ userProfile.is_active ? '活跃' : '未激活' }}
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">验证状态:</span>
                        <span class="font-medium" :class="userProfile.is_verified ? 'text-green-600' : 'text-yellow-600'">
                            {{ userProfile.is_verified ? '已验证' : '未验证' }}
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">注册时间:</span>
                        <span class="font-medium text-sm">{{ formatDate(userProfile.created_at) }}</span>
                    </div>
                </div>
            </div>

            <!-- 加载状态 -->
            <div v-if="isLoadingProfile" class="flex items-center justify-center mb-6">
                <span class="loading loading-spinner loading-md"></span>
                <span class="ml-2 text-gray-600">正在获取用户信息...</span>
            </div>

            <!-- 手动跳转按钮 -->
            <div class="mt-6">
                <button
                    @click="goToDashboard"
                    class="btn btn-primary"
                    :disabled="isLoadingProfile"
                >
                    立即进入系统
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getUserProfileAPI, type UserProfileResponse } from '@/services/auth'

const router = useRouter()
const { userInfo, initAuth } = useAuth()

// 用户完整资料
const userProfile = ref<UserProfileResponse | null>(null)
const isLoadingProfile = ref(false)

// 倒计时
const countdown = ref(3)
let countdownInterval: number | null = null

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取用户资料
const fetchUserProfile = async () => {
  isLoadingProfile.value = true
  try {
    const profile = await getUserProfileAPI()
    userProfile.value = profile
    console.log('获取用户资料成功:', profile)
  } catch (error) {
    console.error('获取用户资料失败:', error)
    // 如果获取失败，至少显示基础信息
  } finally {
    isLoadingProfile.value = false
  }
}

// 跳转到仪表盘
const goToDashboard = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  router.push('/dashboard/home')
}

// 开始倒计时
const startCountdown = () => {
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (countdownInterval) {
        clearInterval(countdownInterval)
      }
      goToDashboard()
    }
  }, 1000)
}

onMounted(async () => {
  // 初始化认证状态（从 localStorage 获取用户信息）
  initAuth()

  // 获取用户完整资料
  await fetchUserProfile()

  // 开始倒计时
  startCountdown()
})
</script>