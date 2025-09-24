<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

// 初始化认证状态
const { initAuth } = useAuth()

onMounted(() => {
  // 应用启动时初始化认证状态
  initAuth()
})
</script>
