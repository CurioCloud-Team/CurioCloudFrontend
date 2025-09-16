<template>
  <!--
    主导航条（nav）
    - 使用语义元素与 role 属性增强可访问性（screen reader）
    - 大屏显示横向菜单（lg:flex），小屏使用按钮切换下拉（open）
    - 所有可交互元素包含 role/aria-label 以便后续自动化测试或无障碍提升
  -->
  <nav class="navbar bg-base-100 shadow-sm relative" role="navigation" aria-label="Main navigation">
    <!-- 左侧：移动端按钮 + 桌面品牌 -->
    <div class="flex-none flex items-center gap-2">
      <!-- 移动端按钮：左侧，打开侧边栏。设置为固定定位以与侧边栏内关闭按钮对齐 -->
      <button
        v-if="!open"
        class="btn btn-ghost lg:hidden mobile-toggle-btn"
        @click="open = true"
        aria-label="Open menu"
        aria-controls="mobile-sidebar"
        :aria-expanded="open"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- 桌面上左侧显示品牌 -->
      <a class="btn btn-ghost normal-case text-xl hidden lg:inline-flex" :href="brandHref" role="link">{{ brand }}</a>
    </div>

    <!-- 中间：移动端品牌居中（桌面隐藏） -->
    <div class="flex-1 flex justify-center">
      <a class="btn btn-ghost normal-case text-xl lg:hidden" :href="brandHref" role="link">{{ brand }}</a>
    </div>

    <!-- 右侧：桌面菜单放在这里以在 lg 上显示在右侧；保留用户控件空间 -->
    <div class="flex-none flex items-center gap-2">
      <ul class="menu menu-horizontal p-0 hidden lg:flex" role="menubar">
        <li v-for="(link, idx) in links" :key="idx" role="none">
          <a :href="link.href" role="menuitem">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- 移动端遮罩（深色半透明），点击关闭侧边栏 -->
  <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" @click="closeMenu" aria-hidden="true"></div>

  <!-- 使用 transition 实现从左到右的滑入/滑出动画 -->
  <transition name="slide-left">
    <aside
      v-if="open"
      id="mobile-sidebar"
      class="fixed top-0 left-0 h-full w-64 bg-base-100 z-50 shadow-lg p-4 lg:hidden"
      role="menu"
      aria-label="Mobile navigation"
    >
      <div class="flex items-center justify-start mb-4 gap-3">
        <!-- 仅保留侧边栏的关闭按钮（品牌仅保留在导航栏中央） -->
        <button v-if="open" class="btn btn-ghost mobile-toggle-btn" @click="closeMenu" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ul class="menu menu-vertical p-0">
        <!-- 移动端菜单：点击后关闭菜单以提升 UX -->
        <li v-for="(link, idx) in links" :key="`mobile-${idx}`" role="none">
          <a :href="link.href" role="menuitem" @click="onMobileLinkClick">{{ link.label }}</a>
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script setup lang="ts">
/*
  Header.vue（可重用导航组件）
  - props:
    - brand (string)         : 显示的品牌文本，默认 'CurioCloud'
    - brandHref (string)     : 品牌链接，默认 '#'
    - links (NavLink[])      : 导航项数组，默认空数组
  - open (ref) 控制移动端下拉显示
  - 使用 computed 提供默认值，便于外部仅传部分 props
  - 如果未来添加子菜单或权限控制，请在 NavLink 中扩展字段并在模板中处理
*/
import { ref, computed, defineProps, onMounted, onBeforeUnmount } from 'vue'

interface NavLink {
  label: string
  href: string
}

const props = defineProps<{ 
  brand?: string
  brandHref?: string
  links?: NavLink[]
}>()

// 控制移动端下拉的布尔值
const open = ref(false)

// 使用 computed 提供默认值，避免模板中出现 undefined
const brand = computed(() => props.brand ?? 'CurioCloud')
const brandHref = computed(() => props.brandHref ?? '#')
const links = computed(() => props.links ?? [])

// 关闭侧边栏（用于遮罩、关闭按钮及链接点击）
function closeMenu() {
  open.value = false
}

// 点击移动端链接后关闭侧边栏以提升 UX
function onMobileLinkClick() {
  closeMenu()
}

// 监听 Esc 键以便用户关闭侧边栏
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
/* 小幅自定义以确保 mobile dropdown 位于正确位置 */
@media (max-width: 1024px) {
  nav .absolute { top: 56px; }
}

/* 增强移动端侧边栏菜单的可点击性与可读性 */
@media (max-width: 1024px) {
  /* 增大菜单项字体、行高以及内边距，保证触控目标至少44-48px */
  aside[role="menu"] .menu li a {
    font-size: 1.05rem; /* 从默认略微增大 */
    line-height: 1.6;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  /* 强调菜单文字（可选，视觉上更清晰） */
  aside[role="menu"] .menu li a {
    font-weight: 500;
  }
}

/* 固定移动端开/关按钮，使它们在导航栏和侧边栏中占据相同位置 */
@media (max-width: 1024px) {
  .mobile-toggle-btn {
    position: fixed;
    top: 12px; /* 与导航栏顶部保持一致 */
    left: 8px; /* 视图左侧内边距 */
    z-index: 60; /* 高于遮罩(z-40)和侧边栏(z-50) */
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

}

/* 侧边栏简单过渡（可根据需要细化） */
aside[role="menu"] {
  /* 初始已由 v-if 控制渲染，保留 transition 供未来用 v-show 切换 */
  transition: transform 0.2s ease-in-out;
}

/* 保证移动端遮罩位于侧边栏下方（遮罩 z-40, 侧边栏 z-50），无需额外样式 */

/* slide-left enter/leave 动画：从左向右滑入，向左滑出 */
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 200ms ease-in-out;
}
</style>
