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
            <p class="text-gray-500">欢迎回来，{{ userInfo?.username || '用户' }}，你将在 5 秒后自动登录</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { userInfo, initAuth } = useAuth()

// 登录时间
const loginTime = ref('')

onMounted(() => {
    // 初始化认证状态（从 localStorage 获取用户信息）
    initAuth()

    // 设置登录时间
    loginTime.value = new Date().toLocaleString('zh-CN')

    // 5秒后自动跳转到仪表盘
    setTimeout(() => {
        router.push('/dashboard/home')
    }, 5000)
})
</script>