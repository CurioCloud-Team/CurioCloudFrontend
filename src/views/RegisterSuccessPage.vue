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

            <!-- 加载状态 -->
            <div v-if="isLoading" class="text-center">
                <div class="loading loading-spinner loading-lg mb-4"></div>
                <p class="text-gray-500">正在获取账户信息...</p>
            </div>

            <!-- 成功状态 -->
            <div v-else-if="userInfo">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">注册成功！</h1>
                <p class="text-gray-500">您的账户已创建完成</p>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="errorMessage" class="text-center">
                <h1 class="text-3xl font-bold text-red-600 mb-2">获取账户信息失败</h1>
                <p class="text-gray-500 mb-4">{{ errorMessage }}</p>
                <button @click="retry" class="btn btn-primary">
                    重试
                </button>
            </div>
    </div>

    <!-- 注册信息确认 -->
    <!-- <div v-if="userInfo" class="bg-gray-50 rounded-xl p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">账户详情</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">用户名</span>
          <span class="font-medium">{{ userInfo.username }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">邮箱</span>
          <span class="font-medium">{{ userInfo.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">姓名</span>
          <span class="font-medium">{{ userInfo.full_name || '未设置' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">状态</span>
          <span class="font-medium">{{ userInfo.is_active ? '活跃' : '未激活' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">注册时间</span>
          <span class="font-medium">{{ registrationTime }}</span>
        </div>
      </div>
    </div> -->

    <!-- 操作按钮 -->
    <div v-if="userInfo" class="space-y-4">
      <button 
        @click="goToLogin"
        class="btn btn-outline w-full"
      >
        前往登录
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserProfileAPI } from '../api/auth'
import type { UserProfileResponse } from '../types/auth'

const router = useRouter()

// 用户信息
const userInfo = ref<UserProfileResponse | null>(null)

// 加载状态
const isLoading = ref(true)

// 错误信息
const errorMessage = ref<string | null>(null)

// 注册时间
const registrationTime = ref('')

onMounted(async () => {
  try {
    const { data } = await getUserProfileAPI()
    userInfo.value = data

    // 设置注册时间
    registrationTime.value = new Date().toLocaleString('zh-CN')
  } catch (error: any) {
    console.error('获取用户信息失败:', error)
    isLoading.value = false
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = error.response.data.detail
    } else {
      errorMessage.value = '获取用户信息失败，请稍后重试'
    }
  } finally {
    isLoading.value = false
  }
})

const retry = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const { data } = await getUserProfileAPI()
    userInfo.value = data
    registrationTime.value = new Date().toLocaleString('zh-CN')
  } catch (error: any) {
    console.error('获取用户信息失败:', error)
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = error.response.data.detail
    } else {
      errorMessage.value = '获取用户信息失败，请稍后重试'
    }
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/auth/login')
}
</script>