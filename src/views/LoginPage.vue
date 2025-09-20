<template>
  <div class="p-8">
    <!-- 标题区域 -->
    <div class="text-left mb-10">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">欢迎使用</h1>
      <p class="text-gray-500 text-base">使用你的 课研云 账户登录</p>
    </div>

  <!-- 登录表单 -->
  <form @submit.prevent="handleLogin" class="space-y-6">
    <!-- 用户名/邮箱输入框 -->
    <div class="form-control flex flex-col gap-2">
      <label class="label">
        <span class="label-text">用户名或邮箱</span>
      </label>
      <input 
        type="text"
        class="input input-bordered w-full"
        v-model="loginForm.username"
        placeholder="请输入用户名或邮箱"
        required
      />
    </div>

    <!-- 密码输入框 -->
    <div class="form-control flex flex-col gap-2">
      <label class="label">
        <span class="label-text">密码</span>
      </label>
      <input 
        type="password"
        class="input input-bordered w-full"
        v-model="loginForm.password"
        placeholder="请输入密码"
        required
      />
      <label class="label">
        <button 
          type="button"
          @click="goToForgotPassword"
          class="label-text-alt link link-hover text-orange-800 hover:text-orange-700"
        >
          忘记密码？
        </button>
      </label>
    </div>

    <!-- 登录按钮 -->
    <div class="form-control mt-4">
      <button 
        type="submit" 
        class="btn btn-soft w-full"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="loading loading-spinner"></span>
        <span v-if="!isLoading">登录</span>
        <span v-else>登录中...</span>
      </button>
    </div>
  </form>

  <!-- 注册链接 -->
  <div class="mt-6">
    <button 
      @click="goToRegister" 
      class="text-gray-400 hover:text-gray-600 transition-colors w-full"
    >
      <div class="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
        <div class="flex items-center gap-4">
          <div>
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.89997 3.96668C4.89997 2.80688 5.84017 1.86668 6.99997 1.86668C8.15977 1.86668 9.09997 2.80688 9.09997 3.96668C9.09997 5.12648 8.15977 6.06668 6.99997 6.06668C5.84017 6.06668 4.89997 5.12648 4.89997 3.96668ZM6.99997 0.93335C5.32471 0.93335 3.96664 2.29142 3.96664 3.96668C3.96664 5.64195 5.32471 7.00002 6.99997 7.00002C8.67523 7.00002 10.0333 5.64195 10.0333 3.96668C10.0333 2.29142 8.67523 0.93335 6.99997 0.93335ZM2.19477 11.5483C2.36741 10.8139 2.78353 10.0945 3.51758 9.55524C4.25238 9.01545 5.33746 8.63335 6.88331 8.63335H7.11664C8.66248 8.63335 9.74757 9.01545 10.4824 9.55524C11.2164 10.0945 11.6325 10.8139 11.8052 11.5483C11.8253 11.6341 11.8031 11.7091 11.7423 11.7744C11.6763 11.8453 11.5652 11.9 11.4333 11.9H2.56664C2.43471 11.9 2.32368 11.8453 2.25767 11.7744C2.19689 11.7091 2.17461 11.6341 2.19477 11.5483ZM6.88331 7.70002C5.18246 7.70002 3.89201 8.12206 2.96501 8.80305C2.03726 9.48459 1.50531 10.4026 1.2862 11.3347C1.08176 12.2044 1.83233 12.8333 2.56664 12.8333H11.4333C12.1676 12.8333 12.9182 12.2044 12.7137 11.3347C12.4946 10.4026 11.9627 9.48459 11.0349 8.80305C10.1079 8.12206 8.81749 7.70002 7.11664 7.70002H6.88331Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700 text-left">没有账号？</p>
            <p class="text-xs text-gray-500">免费注册一个，即可畅享众多服务。</p>
          </div>
        </div>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  console.log('登录信息:', loginForm.value)
  
  try {
    // TODO: 实现实际的登录逻辑
    // const response = await loginAPI(loginForm.value)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 登录成功，跳转到成功页面
    router.push('/auth/login-success')
    
  } catch (error) {
    console.error('登录失败:', error)
    // TODO: 显示错误信息
    alert('登录失败，请检查用户名和密码')
  } finally {
    isLoading.value = false
  }
}

const goToRegister = () => {
  router.push('/auth/register')
}

const goToForgotPassword = () => {
    router.push('/auth/forgot-password')
}
</script>
