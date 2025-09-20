<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="flex w-full max-w-5xl justify-between items-center">
        <!-- 左侧插图区域 -->
        <div class="hidden lg:flex lg:w-1/2 items-center justify-center p-16">
          <div class="text-center">
            <!-- Lottie动画 -->
            <div class="w-80 h-80 mb-8">
              <Vue3Lottie 
                v-if="shouldPlayLottie"
                :animationData="startAnimationData" 
                :loop="false"
                :autoplay="true"
                class="w-full h-full"
                @complete="onLottieComplete"
              />
            </div>
            <p class="text-gray-600 text-lg">AI 驱动的教师备课辅助系统</p>
          </div>
        </div>

        <!-- 右侧表单区域 -->
        <div class="w-lg bg-white rounded-3xl transition-all duration-300 ease-in-out">
          <div class="mx-auto">
            <!-- 内容切换区域 -->
            <div class="relative overflow-hidden">
              <!-- 页面切换指示器 -->
              <!-- 使用正确的 Vue 3 router-view + transition 模式 -->
              <router-view v-slot="{ Component }">
                <Transition name="fade-slide">
                  <component :is="Component" :key="route.path" />
                </Transition>
              </router-view>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Vue3Lottie } from 'vue3-lottie'
import startAnimationData from '@/assets/animation/StartAnimation.json'

const route = useRoute()
const showCard = ref(false)

// 动画状态管理
const AUTH_ANIMATION_KEY = 'auth-animation-played'
const hasPlayedAnimation = ref(false)
const currentPage = ref('')

// 监听路由变化，记录当前页面用于动画
watch(() => route.path, (newPath) => {
  const pageName = newPath.includes('register') ? 'register' : 'login'
  if (currentPage.value && currentPage.value !== pageName) {
    console.log('Page switching:', currentPage.value, '->', pageName)
  }
  currentPage.value = pageName
}, { immediate: true })

// 检查是否需要播放动画
const shouldPlayAnimation = computed(() => {
  // 如果是第一次访问auth路由，或者是从非auth路由来的
  const fromSessionStorage = sessionStorage.getItem(AUTH_ANIMATION_KEY)
  return !fromSessionStorage || !hasPlayedAnimation.value
})

const shouldPlayLottie = computed(() => shouldPlayAnimation.value)

// 页面挂载后的逻辑
onMounted(() => {
  const animationPlayed = sessionStorage.getItem(AUTH_ANIMATION_KEY)
  
  if (animationPlayed) {
    // 如果已经播放过动画，直接显示内容
    hasPlayedAnimation.value = true
    showCard.value = true
  } else {
    // 第一次访问，播放动画
    hasPlayedAnimation.value = false
    setTimeout(() => {
      showCard.value = true
    }, 100)
  }
  
  console.log('AuthLayout mounted:', {
    animationPlayed,
    shouldPlayAnimation: shouldPlayAnimation.value,
    shouldPlayLottie: shouldPlayLottie.value
  })
})

// Lottie动画完成回调
const onLottieComplete = () => {
  hasPlayedAnimation.value = true
  sessionStorage.setItem(AUTH_ANIMATION_KEY, 'true')
  console.log('Lottie animation completed')
}

// 清除动画状态（用于测试）
const clearAnimationState = () => {
  sessionStorage.removeItem(AUTH_ANIMATION_KEY)
  hasPlayedAnimation.value = false
  showCard.value = false
  setTimeout(() => {
    showCard.value = true
  }, 100)
}

// 暴露给模板使用
defineExpose({
  clearAnimationState
})
</script>

<style scoped>
/* 简单可靠的切换动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-active {
  position: absolute;
  width: 100%;
}

/* 为右侧容器添加更好的视觉效果 */
.w-lg {
  width: 500px;
  max-width: 90vw;
}

/* 添加一个微妙的背景动画 */
@keyframes background-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>