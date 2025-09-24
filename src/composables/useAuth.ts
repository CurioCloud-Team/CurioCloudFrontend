import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 用户信息接口
export interface UserInfo {
  username: string
  email: string
}

// 认证状态管理
const userInfo = ref<UserInfo | null>(null)
const token = ref<string | null>(null)

// 检查是否已登录
export const useAuth = () => {
  const router = useRouter()

  // 计算属性：是否已登录
  const isAuthenticated = computed(() => {
    return !!token.value && !!userInfo.value
  })

  // 初始化认证状态
  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUserInfo = localStorage.getItem('userInfo')

    if (storedToken && storedUserInfo) {
      try {
        token.value = storedToken
        userInfo.value = JSON.parse(storedUserInfo)
        console.log('认证状态已从本地存储恢复')
      } catch (error) {
        console.error('恢复用户信息失败:', error)
        clearAuth()
      }
    }
  }

  // 登录
  const login = (user: UserInfo, authToken: string) => {
    userInfo.value = user
    token.value = authToken

    // 保存到本地存储
    localStorage.setItem('userInfo', JSON.stringify(user))
    localStorage.setItem('token', authToken)

    console.log('用户已登录:', user.username)
  }

  // 退出登录
  const logout = () => {
    userInfo.value = null
    token.value = null

    // 清除本地存储
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    
    // 清除会话存储
    sessionStorage.clear()

    console.log('用户已退出登录')
  }

  // 清除认证状态
  const clearAuth = () => {
    logout()
  }

  // 获取当前用户信息
  const getCurrentUser = () => {
    return userInfo.value
  }

  // 获取当前令牌
  const getToken = () => {
    return token.value
  }

  // 安全退出登录（带确认）
  const safeLogout = (confirmMessage = '确定要退出登录吗？') => {
    if (confirm(confirmMessage)) {
      logout()
      router.push('/auth/login')
      return true
    }
    return false
  }

  return {
    userInfo: computed(() => userInfo.value),
    token: computed(() => token.value),
    isAuthenticated,
    initAuth,
    login,
    logout,
    clearAuth,
    getCurrentUser,
    getToken,
    safeLogout
  }
}