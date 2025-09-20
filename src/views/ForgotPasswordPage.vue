<template>
  <div class="p-8">
    <!-- 标题区域 -->
    <div class="text-left mb-10">
      <div class="flex items-center gap-4 mb-3">
        <button 
          @click="goToLogin" 
          class="btn btn-ghost btn-circle"
          aria-label="返回登录"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-gray-900">忘记密码</h1>
      </div>
    </div>

    <!-- 步骤指示器 -->
    <div class="flex justify-center mb-8">
      <ul class="steps steps-horizontal w-100">
        <li class="step" :class="{ 'step-primary': currentStep >= 1 }">输入邮箱</li>
        <li class="step" :class="{ 'step-primary': currentStep >= 2 }">验证码</li>
        <li class="step" :class="{ 'step-primary': currentStep >= 3 }">重置密码</li>
      </ul>
    </div>

    <!-- 步骤1: 输入邮箱 -->
    <div v-if="currentStep === 1">
      <form @submit.prevent="handleSendCode" class="space-y-6">
        <div class="form-control flex flex-col gap-2">
          <label class="label">
            <span class="label-text">邮箱地址</span>
          </label>
          <input 
            type="email"
            class="input input-bordered w-full"
            :class="{ 'input-error': errors.email }"
            v-model="resetForm.email"
            @blur="validateEmail"
            placeholder="请输入您的注册邮箱"
            required
          />
          <label class="label" v-if="errors.email">
            <span class="label-text-alt text-error">{{ errors.email }}</span>
          </label>
          <label class="label" v-else>
            <span class="label-text-alt text-gray-500">我们将向此邮箱发送验证码</span>
          </label>
        </div>

        <div class="form-control mt-6">
          <button 
            type="submit" 
            class="btn btn-neutral w-full"
            :disabled="isLoading || !isEmailValid"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-if="!isLoading">发送验证码</span>
            <span v-else>发送中...</span>
          </button>
        </div>
      </form>
    </div>

    <!-- 步骤2: 验证码验证 -->
    <div v-if="currentStep === 2">
      <form @submit.prevent="handleVerifyCode" class="space-y-6">
        <div class="form-control flex flex-col gap-2">
          <label class="label">
            <span class="label-text">验证码</span>
          </label>
          <input 
            type="text"
            class="input input-bordered w-full text-center text-2xl tracking-widest"
            :class="{ 'input-error': errors.verificationCode }"
            v-model="resetForm.verificationCode"
            @blur="validateVerificationCode"
            placeholder="请输入6位验证码"
            maxlength="6"
            required
          />
          <label class="label" v-if="errors.verificationCode">
            <span class="label-text-alt text-error">{{ errors.verificationCode }}</span>
          </label>
          <label class="label" v-else>
            <span class="label-text-alt text-gray-500">
              验证码已发送至 {{ resetForm.email }}
            </span>
          </label>
        </div>

        <!-- 重新发送倒计时 -->
        <div class="text-center">
          <button 
            v-if="resendCountdown > 0"
            type="button"
            class="btn btn-ghost btn-sm"
            disabled
          >
            {{ resendCountdown }}秒后可重新发送
          </button>
          <button 
            v-else
            type="button"
            class="btn btn-ghost btn-sm"
            @click="handleResendCode"
            :disabled="isResending"
          >
            <span v-if="isResending" class="loading loading-spinner loading-sm"></span>
            <span v-if="!isResending">重新发送验证码</span>
            <span v-else>发送中...</span>
          </button>
        </div>

        <div class="form-control mt-6">
          <button 
            type="submit" 
            class="btn btn-neutral w-full"
            :disabled="isLoading || !isCodeValid"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-if="!isLoading">验证</span>
            <span v-else>验证中...</span>
          </button>
        </div>
      </form>
    </div>

    <!-- 步骤3: 设置新密码 -->
    <div v-if="currentStep === 3">
      <form @submit.prevent="handleResetPassword" class="space-y-6">
        <div class="form-control flex flex-col gap-2">
          <label class="label">
            <span class="label-text">新密码</span>
          </label>
          <input 
            type="password"
            class="input input-bordered w-full"
            :class="{ 'input-error': errors.newPassword }"
            v-model="resetForm.newPassword"
            @blur="validateNewPassword"
            placeholder="请输入新密码"
            required
          />
          <label class="label" v-if="errors.newPassword">
            <span class="label-text-alt text-error">{{ errors.newPassword }}</span>
          </label>
          <label class="label" v-else>
            <span class="label-text-alt text-gray-500">密码至少8位，包含字母和数字</span>
          </label>
        </div>

        <div class="form-control flex flex-col gap-2">
          <label class="label">
            <span class="label-text">确认新密码</span>
          </label>
          <input 
            type="password"
            class="input input-bordered w-full"
            :class="{ 'input-error': errors.confirmPassword }"
            v-model="resetForm.confirmPassword"
            @blur="validateConfirmPassword"
            placeholder="请再次输入新密码"
            required
          />
          <label class="label" v-if="errors.confirmPassword">
            <span class="label-text-alt text-error">{{ errors.confirmPassword }}</span>
          </label>
        </div>

        <div class="form-control mt-6">
          <button 
            type="submit" 
            class="btn btn-neutral w-full"
            :disabled="isLoading || !isPasswordValid"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-if="!isLoading">重置密码</span>
            <span v-else>重置中...</span>
          </button>
        </div>
      </form>
    </div>

    <!-- 成功状态 -->
    <div v-if="currentStep === 4" class="text-center space-y-6">
      <div class="flex justify-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-green-700">
                    <g id="thickness=Bold, mode=default, name=symbol_right">
                        <path id="S1" fill-rule="evenodd" clip-rule="evenodd"
                            d="M114.5 18C114.5 18.904 114.233 19.7457 113.775 20.4508L62.2626 102.422C57.702 109.679 47.3564 110.298 41.9634 103.636L6.52077 59.8541C5.8829 59.0775 5.5 58.0835 5.5 57C5.5 54.5147 7.51472 52.5 10 52.5C11.403 52.5 12.656 53.142 13.4812 54.1483L49.377 97.3086C50.4549 98.6047 52.4803 98.4843 53.397 97.0696L106.184 15.6141C106.979 14.3443 108.391 13.5 110 13.5C112.485 13.5 114.5 15.5147 114.5 18Z"
                            fill="currentColor" />
                    </g>
                </svg>
            </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">密码重置成功！</h2>
        <p class="text-gray-500">您的密码已成功重置，现在可以使用新密码登录了。</p>
      </div>
      <div class="form-control">
        <button 
          @click="goToLogin" 
          class="btn btn-neutral w-full"
        >
          立即登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 当前步骤 (1: 输入邮箱, 2: 验证码, 3: 设置新密码, 4: 成功)
const currentStep = ref(1)

// 步骤描述
const stepDescriptions = [
  '请输入您的注册邮箱地址，我们将向该邮箱发送验证码',
  '请输入您收到的6位验证码',
  '请设置您的新密码',
  '密码重置完成'
]

// 表单数据
const resetForm = ref({
  email: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: ''
})

// 错误信息
const errors = ref({
  email: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: ''
})

// 加载状态
const isLoading = ref(false)
const isResending = ref(false)

// 重新发送倒计时
const resendCountdown = ref(0)
let countdownTimer: number | null = null

// 邮箱验证
const isEmailValid = computed(() => {
  const email = resetForm.value.email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
})

// 验证码验证
const isCodeValid = computed(() => {
  const code = resetForm.value.verificationCode
  return code.length === 6 && /^\d{6}$/.test(code)
})

// 密码强度验证
const isNewPasswordValid = computed(() => {
  const password = resetForm.value.newPassword
  return password.length >= 8 && /(?=.*[a-zA-Z])(?=.*\d)/.test(password)
})

// 密码确认验证
const isPasswordMatch = computed(() => {
  return resetForm.value.newPassword === resetForm.value.confirmPassword && 
         resetForm.value.confirmPassword !== ''
})

// 密码表单整体验证
const isPasswordValid = computed(() => {
  return isNewPasswordValid.value && isPasswordMatch.value
})

// 字段验证函数
const validateEmail = () => {
  errors.value.email = ''
  if (!resetForm.value.email) {
    errors.value.email = '请输入邮箱地址'
  } else if (!isEmailValid.value) {
    errors.value.email = '请输入有效的邮箱地址'
  }
}

const validateVerificationCode = () => {
  errors.value.verificationCode = ''
  if (!resetForm.value.verificationCode) {
    errors.value.verificationCode = '请输入验证码'
  } else if (!isCodeValid.value) {
    errors.value.verificationCode = '请输入6位数字验证码'
  }
}

const validateNewPassword = () => {
  errors.value.newPassword = ''
  if (!resetForm.value.newPassword) {
    errors.value.newPassword = '请输入新密码'
  } else if (!isNewPasswordValid.value) {
    errors.value.newPassword = '密码至少8位，包含字母和数字'
  }
}

const validateConfirmPassword = () => {
  errors.value.confirmPassword = ''
  if (!resetForm.value.confirmPassword) {
    errors.value.confirmPassword = '请确认新密码'
  } else if (!isPasswordMatch.value) {
    errors.value.confirmPassword = '两次输入的密码不匹配'
  }
}

// 开始倒计时
const startCountdown = () => {
  resendCountdown.value = 60
  countdownTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

// 步骤1: 发送验证码
const handleSendCode = async () => {
  validateEmail()
  if (!isEmailValid.value) return

  isLoading.value = true
  console.log('发送验证码到:', resetForm.value.email)

  try {
    // TODO: 实现实际的发送验证码逻辑
    // const response = await sendResetCodeAPI({ email: resetForm.value.email })

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 发送成功，进入下一步
    currentStep.value = 2
    startCountdown()

  } catch (error) {
    console.error('发送验证码失败:', error)
    errors.value.email = '发送验证码失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 重新发送验证码
const handleResendCode = async () => {
  isResending.value = true
  console.log('重新发送验证码到:', resetForm.value.email)

  try {
    // TODO: 实现实际的重新发送验证码逻辑
    // const response = await sendResetCodeAPI({ email: resetForm.value.email })

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 重新开始倒计时
    startCountdown()

  } catch (error) {
    console.error('重新发送验证码失败:', error)
    errors.value.verificationCode = '重新发送失败，请稍后重试'
  } finally {
    isResending.value = false
  }
}

// 步骤2: 验证验证码
const handleVerifyCode = async () => {
  validateVerificationCode()
  if (!isCodeValid.value) return

  isLoading.value = true
  console.log('验证码:', resetForm.value.verificationCode)

  try {
    // TODO: 实现实际的验证码验证逻辑
    // const response = await verifyResetCodeAPI({
    //   email: resetForm.value.email,
    //   code: resetForm.value.verificationCode
    // })

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 验证成功，进入下一步
    currentStep.value = 3

  } catch (error) {
    console.error('验证码验证失败:', error)
    errors.value.verificationCode = '验证码错误或已过期，请重新输入'
  } finally {
    isLoading.value = false
  }
}

// 步骤3: 重置密码
const handleResetPassword = async () => {
  validateNewPassword()
  validateConfirmPassword()
  if (!isPasswordValid.value) return

  isLoading.value = true
  console.log('重置密码')

  try {
    // TODO: 实现实际的重置密码逻辑
    // const response = await resetPasswordAPI({
    //   email: resetForm.value.email,
    //   code: resetForm.value.verificationCode,
    //   newPassword: resetForm.value.newPassword
    // })

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 重置成功，显示成功页面
    currentStep.value = 4

  } catch (error) {
    console.error('密码重置失败:', error)
    errors.value.newPassword = '密码重置失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 返回登录
const goToLogin = () => {
  router.push('/auth/login')
}

// 清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
/* 整个卡片的浮入动画 */
.card-float-in-enter-active {
  transition: all 1s ease-out;
}

.card-float-in-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}

.card-float-in-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 确保动画完成后状态稳定 */
.card-float-in-enter-to {
  will-change: auto;
}
</style>
