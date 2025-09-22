<template>
  <div class="p-8">
    <!-- 标题区域 -->
    <div class="text-left mb-10">
    <div class="flex items-center gap-4 mb-3">
      <button 
        @click="goToLogin" 
        class="btn btn-soft btn-circle"
        aria-label="返回登录"
      >
<svg class="text-gray-600 size-6" width="20" height="20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="thickness=Standard, mode=default, name=direction_arrowRightUp">
<path id="S1L" fill-rule="evenodd" clip-rule="evenodd" d="M81.844 12.6874C83.3973 14.2582 83.3832 16.7908 81.8124 18.3442L42.5326 57.1875C40.9556 58.747 40.9485 61.2918 42.5168 62.8601L81.8282 102.172C83.3903 103.734 83.3903 106.266 81.8282 107.828C80.2661 109.391 77.7335 109.391 76.1714 107.828L36.8599 68.517C32.1551 63.8122 32.1764 56.1776 36.9075 51.4991L76.1872 12.6558C77.758 11.1025 80.2907 11.1166 81.844 12.6874Z" fill="currentColor"/>
</g>
</svg>

      </button>
      <h1 class="text-2xl font-bold text-gray-900">创建账户</h1>
    </div>
  </div>

  <!-- 注册表单 -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- 用户名输入框 -->
            <div class="form-control flex flex-col gap-2">
              <label class="label">
                <span class="label-text">用户名</span>
              </label>
              <input 
                type="text"
                class="input w-full"
                :class="{ 'input-error': errors.username }"
                v-model="registerForm.username"
                @blur="validateField('username')"
                placeholder="请输入用户名"
                required
              />
              <label class="label" v-if="errors.username">
                <span class="label-text-alt text-error">{{ errors.username }}</span>
              </label>
            </div>

            <!-- 邮箱输入框 -->
            <div class="form-control flex flex-col gap-2">
              <label class="label">
                <span class="label-text">邮箱地址</span>
              </label>
              <input 
                type="email"
                class="input w-full"
                :class="{ 'input-error': errors.email }"
                v-model="registerForm.email"
                @blur="validateField('email')"
                placeholder="请输入邮箱地址"
                required
              />
              <label class="label" v-if="errors.email">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </label>
            </div>

            <!-- 密码输入框 -->
            <div class="form-control flex flex-col gap-2">
              <label class="label">
                <span class="label-text">密码</span>
              </label>
              <input 
                type="password"
                class="input w-full"
                :class="{ 'input-error': errors.password }"
                v-model="registerForm.password"
                @blur="validateField('password')"
                placeholder="请输入密码"
                required
              />
              <label class="label" v-if="errors.password">
                <span class="label-text-alt text-error">{{ errors.password }}</span>
              </label>
              <label class="label" v-else>
                <span class="label-text-alt text-gray-500">密码至少8位，包含字母和数字</span>
              </label>
            </div>

            <!-- 确认密码输入框 -->
            <div class="form-control flex flex-col gap-2">
              <label class="label">
                <span class="label-text">确认密码</span>
              </label>
              <input 
                type="password"
                class="input w-full"
                :class="{ 'input-error': errors.confirmPassword }"
                v-model="registerForm.confirmPassword"
                @blur="validateField('confirmPassword')"
                placeholder="请再次输入密码"
                required
              />
              <label class="label" v-if="errors.confirmPassword">
                <span class="label-text-alt text-error">{{ errors.confirmPassword }}</span>
              </label>
            </div>

            <!-- 协议同意选项 -->
            <div class="form-control">
              <label class="label cursor-pointer justify-start">
                <input type="checkbox" class="checkbox checkbox-primary mr-3" v-model="registerForm.agreeTerms" required />
                <span class="label-text">我同意 
                  <a href="#" class="link link-primary">用户协议</a> 和 
                  <a href="#" class="link link-primary">隐私政策</a>
                </span>
              </label>
            </div>

          <!-- 注册按钮 -->
          <div class="form-control mt-4">
            <button 
              type="submit" 
              class="btn btn-neutral w-full"
              :disabled="isLoading || !isFormValid"
            >
              <span v-if="isLoading" class="loading loading-spinner"></span>
              <span v-if="!isLoading">创建账户</span>
              <span v-else>创建中...</span>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-error text-sm mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{{ errorMessage }}</span>
          </div>

        </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { registerAPI } from '../api/auth'
import type { UserCreate } from '../types/auth'

const router = useRouter()

const registerForm = ref<UserCreate & { confirmPassword: string; agreeTerms: boolean }>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  confirm_password: '',
  agreeTerms: false
})

const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 用户名验证
const isUsernameValid = computed(() => {
  const username = registerForm.value.username
  return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username)
})

// 邮箱验证
const isEmailValid = computed(() => {
  const email = registerForm.value.email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
})

// 密码强度验证
const isPasswordValid = computed(() => {
  const password = registerForm.value.password
  return password.length >= 8 && /(?=.*[a-zA-Z])(?=.*\d)/.test(password)
})

// 密码确认验证
const passwordMatch = computed(() => {
  return registerForm.value.password === registerForm.value.confirmPassword && registerForm.value.confirmPassword !== ''
})

// 表单整体验证
const isFormValid = computed(() => {
  return isUsernameValid.value && 
         isEmailValid.value && 
         isPasswordValid.value && 
         passwordMatch.value && 
         registerForm.value.agreeTerms
})

const validateField = (field: string) => {
  errors.value[field as keyof typeof errors.value] = ''
  
  switch (field) {
    case 'username':
      if (!isUsernameValid.value) {
        errors.value.username = '用户名为3-20位字母、数字或下划线'
      }
      break
    case 'email':
      if (!isEmailValid.value) {
        errors.value.email = '请输入有效的邮箱地址'
      }
      break
    case 'password':
      if (!isPasswordValid.value) {
        errors.value.password = '密码至少8位，包含字母和数字'
      }
      break
    case 'confirmPassword':
      if (!passwordMatch.value) {
        errors.value.confirmPassword = '两次输入的密码不匹配'
      }
      break
  }
}

const handleRegister = async () => {
  // 验证所有字段
  validateField('username')
  validateField('email')
  validateField('password')
  validateField('confirmPassword')
  
  if (!isFormValid.value) {
    return
  }
  
  isLoading.value = true
  errorMessage.value = null
  console.log('注册信息:', registerForm.value)
  
  try {
    // 准备注册数据
    const registerData: UserCreate = {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      confirm_password: registerForm.value.confirmPassword
    }
    
    const { data } = await registerAPI(registerData)
    
    // 存储 token
    localStorage.setItem('accessToken', data.token.access_token)
    
    // 注册成功，跳转到成功页面
    await router.push('/auth/register-success')
    
  } catch (error: any) {
    console.error('注册失败:', error)
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = error.response.data.detail
    } else {
      errorMessage.value = '注册失败，请稍后重试'
    }
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/auth/login')
}
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
