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

            <!-- 加载状态 -->
            <div v-if="isLoading" class="text-center">
                <div class="loading loading-spinner loading-lg mb-4"></div>
                <p class="text-gray-500">正在获取用户信息...</p>
            </div>

            <!-- 成功状态 -->
            <div v-else-if="userInfo">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">登录成功</h1>
                <p class="text-gray-500">欢迎回来，{{ userInfo.username || '用户' }}，你将在 3 秒后自动跳转到仪表盘</p>

                <!-- 用户信息卡片 -->
                <!-- <div class="mt-6 bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                    <div class="text-sm text-gray-600 space-y-1">
                        <p><strong>用户名:</strong> {{ userInfo.username }}</p>
                        <p><strong>邮箱:</strong> {{ userInfo.email }}</p>
                        <p><strong>姓名:</strong> {{ userInfo.full_name || '未设置' }}</p>
                        <p><strong>状态:</strong> {{ userInfo.is_active ? '活跃' : '未激活' }}</p>
                        <p><strong>登录时间:</strong> {{ loginTime }}</p>
                    </div>
                </div> -->

                <!-- 操作按钮 -->
                <div class="mt-6 space-y-3">
                    <button @click="goToDashboard" class="btn btn-primary w-full">
                        立即进入仪表盘
                    </button>
                    <button @click="logout" class="btn btn-outline w-full">
                        退出登录
                    </button>
                </div>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="errorMessage" class="text-center">
                <h1 class="text-3xl font-bold text-red-600 mb-2">获取用户信息失败</h1>
                <p class="text-gray-500 mb-4">{{ errorMessage }}</p>
                <div class="space-y-3">
                    <button @click="retry" class="btn btn-primary">
                        重试
                    </button>
                    <button @click="logout" class="btn btn-outline">
                        返回登录
                    </button>
                </div>
            </div>
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

// 登录时间
const loginTime = ref('')

onMounted(async () => {
    try {
        const { data } = await getUserProfileAPI()
        userInfo.value = data

        // 设置登录时间
        loginTime.value = new Date().toLocaleString('zh-CN')

        // 3秒后自动跳转到仪表盘
        setTimeout(() => {
            router.push('/dashboard/home')
        }, 3000)
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

const goToDashboard = () => {
    // 跳转到仪表盘
    router.push('/dashboard/home')
}

const retry = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const { data } = await getUserProfileAPI()
        userInfo.value = data
        loginTime.value = new Date().toLocaleString('zh-CN')

        // 3秒后自动跳转到仪表盘
        setTimeout(() => {
            router.push('/dashboard/home')
        }, 3000)
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

const logout = () => {
    // 清除认证信息
    localStorage.removeItem('accessToken')
    router.push('/auth/login')
}
</script>