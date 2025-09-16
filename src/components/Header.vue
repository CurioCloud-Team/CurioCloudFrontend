<template>
  <!--
    主导航条（nav）
    - 使用语义元素与 role 属性增强可访问性（screen reader）
    - 大屏显示横向菜单（lg:flex），小屏使用按钮切换下拉（open）
    - 所有可交互元素包含 role/aria-label 以便后续自动化测试或无障碍提升
  -->
  <nav class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" :href="brandHref">{{ brand }}</a>
    </div>
    <div class="flex-none">
      <!-- 切换按钮：aria-label 根据 open 状态变化，方便无障碍 -->
      <button class="btn btn-ghost lg:hidden" @click="open = !open" :aria-label="open ? 'Close menu' : 'Open menu'">
        <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul class="menu menu-horizontal p-0 hidden lg:flex" role="menubar">
        <!--
          桌面菜单项：
          - 使用 index 作为 key 仅当列表稳定且不重排序时 acceptable
          - 若将来需要动态增删或重排序，请切换到稳定唯一 id 作为 key
        -->
        <li v-for="(link, idx) in links" :key="idx" role="none">
          <a :href="link.href" role="menuitem">{{ link.label }}</a>
        </li>
      </ul>
    </div>

    <div v-if="open" class="absolute top-16 right-4 z-50 bg-base-100 rounded-box shadow-lg p-4 w-48 lg:hidden">
      <ul class="menu p-0" role="menu">
        <!-- 移动端菜单：点击后关闭菜单以提升 UX -->
        <li v-for="(link, idx) in links" :key="`mobile-${idx}`" role="none">
          <a :href="link.href" role="menuitem" @click="open = false">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
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
import { ref, computed, defineProps } from 'vue'

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
</script>

<style scoped>
/* 小幅自定义以确保 mobile dropdown 位于正确位置 */
@media (max-width: 1024px) {
  nav .absolute { top: 56px; }
}

/* 说明：
   - 将样式局部作用域化（scoped），减少对全局的意外影响
   - 若将来需要主题切换或深度定制，建议将这些样式迁移到变量/主题文件中
*/
</style>
