<template>
  <div class="p-8">
    <!-- 成功标题区域 -->
    <div class="text-center mb-8">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-green-700">
                    <g id="thickness=Bold, mode=default, name=symbol_right">
                        <path id="S1" fill-rule="evenodd" clip-rule="evenodd"
                            d="M114.5 18C114.5 18.904 114.233 19.7457 113.775 20.4508L62.2626 102.422C57.702 109.679 47.3564 110.298 41.9634 103.636L6.52077 59.8541C5.8829 59.0775 5.5 58.0835 5.5 57C5.5 54.5147 7.51472 52.5 10 52.5C11.403 52.5 12.656 53.142 13.4812 54.1483L49.377 97.3086C50.4549 98.6047 52.4803 98.4843 53.397 97.0696L106.184 15.6141C106.979 14.3443 108.391 13.5 110 13.5C112.485 13.5 114.5 15.5147 114.5 18Z"
                            fill="currentColor" />
                    </g>
                </svg>
            </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">注册成功！</h1>
      <p class="text-gray-500">您的账户已创建完成</p>
    </div>

    <!-- 邮箱验证提醒 -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6" v-if="!isLoading && userProfile && !userProfile.is_verified">
      <div class="flex items-start">
        <svg class="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-yellow-800 mb-2">请验证您的邮箱</h3>
          <p class="text-yellow-700 mb-4">
            我们已向 <strong>{{ userProfile.email }}</strong> 发送了一封验证邮件。请点击邮件中的链接完成邮箱验证。
          </p>
          <button 
            @click="resendVerification"
            class="btn btn-outline btn-sm"
            :disabled="isResending || countdown > 0"
          >
            <span v-if="isResending" class="loading loading-spinner loading-sm"></span>
            <span v-if="!isResending && countdown <= 0">重新发送验证邮件</span>
            <span v-else>{{ countdown }}秒后可重发</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 验证成功提示 -->
    <div class="bg-green-50 border border-green-200 rounded-xl p-6 mb-6" v-if="!isLoading && userProfile && userProfile.is_verified">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-green-800">邮箱已验证</h3>
          <p class="text-green-700">您的邮箱 {{ userProfile.email }} 已完成验证。</p>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 rounded-xl p-6 mb-6" v-if="!isLoading && userProfile">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">账户详情</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">用户名</span>
          <span class="font-medium">{{ userProfile.username }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">邮箱</span>
          <span class="font-medium">{{ userProfile.email }}</span>
        </div>
        <div class="flex justify-between" v-if="userProfile.full_name">
          <span class="text-gray-600">全名</span>
          <span class="font-medium">{{ userProfile.full_name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">注册时间</span>
          <span class="font-medium">{{ registrationTime }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">账户状态</span>
          <span class="font-medium" :class="userProfile.is_verified ? 'text-green-600' : 'text-yellow-600'">
            {{ userProfile.is_verified ? '已验证' : '待验证' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="bg-gray-50 rounded-xl p-6 mb-6" v-if="isLoading">
      <div class="flex items-center justify-center py-8">
        <div class="loading loading-spinner loading-lg"></div>
        <span class="ml-3 text-gray-600">加载用户信息中...</span>
      </div>
    </div>

    <!-- 错误状态 -->
    <div class="alert alert-error mb-6" v-if="errorMessage">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <h3 class="font-bold">获取信息失败</h3>
        <div class="text-xs">{{ errorMessage }}</div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="space-y-4">
      <button 
        @click="goToDashboard"
        class="btn btn-outline w-full"
        v-if="!isLoading && userProfile && userProfile.is_verified"
      >
        进入系统
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getUserProfileAPI, type UserResponse } from '@/services/auth'

const router = useRouter()
const { userInfo } = useAuth()

// 用户信息
const userProfile = ref<UserResponse | null>(null)
const isLoading = ref(true)
const errorMessage = ref('')

// 注册时间
const registrationTime = ref('')

// 重发验证邮件相关
const isResending = ref(false)
const countdown = ref(0)

onMounted(async () => {
  try {
    // 获取用户完整资料
    const profile = await getUserProfileAPI()
    userProfile.value = profile
    
    // 设置注册时间
    registrationTime.value = new Date(profile.created_at).toLocaleString('zh-CN')
    
  } catch (error: any) {
    console.error('获取用户资料失败:', error)
    
    // 如果API调用失败，使用useAuth中的用户信息作为fallback
    if (userInfo.value) {
      userProfile.value = {
        id: 0, // 临时ID
        username: userInfo.value.username,
        email: userInfo.value.email,
        full_name: null,
        is_active: true,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      registrationTime.value = new Date().toLocaleString('zh-CN')
    } else {
      errorMessage.value = '获取用户信息失败，请刷新页面重试'
    }
  } finally {
    isLoading.value = false
  }
})

const resendVerification = async () => {
  if (isResending.value || countdown.value > 0) return
  
  isResending.value = true
  
  try {
    // TODO: 调用重发验证邮件API
    console.log('重发验证邮件到:', userProfile.value?.email)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 开始倒计时
    startCountdown()
    
    // 显示成功消息
    alert('验证邮件已重新发送，请检查您的邮箱')
    
  } catch (error) {
    console.error('重发验证邮件失败:', error)
    alert('发送失败，请稍后重试')
  } finally {
    isResending.value = false
  }
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>