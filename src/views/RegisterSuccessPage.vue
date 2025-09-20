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

    <!-- 注册信息确认 -->
    <div class="bg-gray-50 rounded-xl p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">账户详情</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">用户名</span>
          <span class="font-medium">{{ registrationInfo.username || 'new_user' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">邮箱</span>
          <span class="font-medium">{{ registrationInfo.email || 'user@example.com' }}</span>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="space-y-4">
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

const router = useRouter()

// 注册信息（实际使用时从注册表单传递）
const registrationInfo = ref({
  username: '',
  email: ''
})

// 注册时间
const registrationTime = ref('')

// 重发验证邮件相关
const isResending = ref(false)
const countdown = ref(0)

onMounted(() => {
  // 模拟从注册表单获取信息
  // 实际实现时可以通过路由参数或状态管理获取
  registrationInfo.value = {
    username: 'new_user',
    email: 'user@example.com'
  }
  
  // 设置注册时间
  registrationTime.value = new Date().toLocaleString('zh-CN')
})

const resendVerification = async () => {
  if (isResending.value || countdown.value > 0) return
  
  isResending.value = true
  
  try {
    // TODO: 调用重发验证邮件API
    console.log('重发验证邮件到:', registrationInfo.value.email)
    
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

const goToLogin = () => {
  router.push('/auth/login')
}

const contactSupport = () => {
  // TODO: 打开客服聊天或跳转到帮助页面
  console.log('联系客服')
  // window.open('mailto:support@curiocloud.com')
}
</script>