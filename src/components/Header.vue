<template>
  <!-- 抽屉布局容器 -->
  <div class="drawer fixed top-0 z-50 w-full">
    <!-- 抽屉切换复选框 (由 label 控制)，用于切换侧边栏的显示和隐藏 -->
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- 导航栏 -->
      <div ref="navbarRef" class="navbar bg-base-300/60 w-full glass">
        <!-- 移动端汉堡菜单按钮 (仅在小屏幕显示) -->
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <!-- 品牌 Logo/文本 -->
        <div class="mx-2 px-2">
          <!-- 根据链接是内部路由还是外部链接，动态渲染为 <router-link> 或 <a> 标签 -->
          <router-link v-if="brandHrefInternal" :to="brandHref" class="font-bold">{{ brandText }}</router-link>
          <a v-else :href="brandHref" class="font-bold">{{ brandText }}</a>
        </div>
        <!-- 桌面端导航菜单 (仅在大屏幕显示) -->
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <!-- 遍历导航链接 -->
            <li v-for="(item, i) in links" :key="i">
              <!-- 根据链接类型渲染 <router-link> 或 <a> -->
              <router-link v-if="isInternal(item.href)" :to="item.href">{{ item.label }}</router-link>
              <a v-else :href="item.href">{{ item.label }}</a>
            </li>
          </ul>
        </div>
        <div class="flex-1"></div>
        <!-- 登录与注册按钮 -->
        <div class="hidden flex-none items-center lg:flex">
          <router-link to="/login" class="btn">登录</router-link>
          <router-link to="/register" class="btn btn-primary ml-2">注册</router-link>
        </div>
      </div>
    </div>
    <!-- 抽屉侧边栏 -->
    <div class="drawer-side" :style="{ marginTop: navbarHeight > 0 ? `${navbarHeight}px` : undefined }">
      <!-- 点击遮罩层可以关闭抽屉 -->
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <!-- 侧边栏菜单 -->
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <!-- 遍历导航链接 -->
        <li v-for="(item, i) in links" :key="`side-${i}`">
          <!-- 根据链接类型渲染 <router-link> 或 <a> -->
          <router-link v-if="isInternal(item.href)" :to="item.href">{{ item.label }}</router-link>
          <a v-else :href="item.href">{{ item.label }}</a>
        </li>
        <!-- 移动端登录注册链接 -->
        <li>
          <router-link to="/login">登录</router-link>
        </li>
        <li>
          <router-link to="/register">注册</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 这是一个响应式的头部组件，具有以下功能：
 * - 在大屏幕上显示水平导航菜单。
 * - 在小屏幕上提供一个可切换的抽屉式侧边栏。
 * - 品牌文本和链接是可定制的。
 * - 导航链接是动态的，并支持内部（Vue Router）和外部链接。
 */

// 使用 Composition API 定义组件逻辑，接收 links 和 brand 相关 props
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 创建一个 ref 来引用导航栏元素
const navbarRef = ref<HTMLElement | null>(null)
// 创建一个 ref 来存储导航栏的高度
const navbarHeight = ref(0)

// 在组件挂载后执行
onMounted(() => {
  // 定义一个 ResizeObserver 来观察导航栏尺寸变化
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // 更新导航栏高度
      navbarHeight.value = entry.target.clientHeight
    }
  })

  // 如果导航栏元素存在，则开始观察
  if (navbarRef.value) {
    resizeObserver.observe(navbarRef.value)
  }

  // 在组件卸载时停止观察，以防止内存泄漏
  onUnmounted(() => {
    if (navbarRef.value) {
      resizeObserver.unobserve(navbarRef.value)
    }
  })
})

// 定义组件接收的 props
const props = defineProps<{
  /**
   * @description 导航链接数组
   * @type {LinkItem[]}
   * @default []
   */
  links?: LinkItem[]
  /**
   * @description 品牌名称
   * @type {string}
   * @default 'Navbar Title'
   */
  brand?: string
  /**
   * @description 品牌链接
   * @type {string}
   * @default '#'
   */
  brandHref?: string
}>()

/**
 * @description 定义导航链接的类型
 * @property {string} label - 链接显示的文本
 * @property {string} href - 链接的 URL
 */
type LinkItem = { label: string; href: string }

/**
 * @description 导航链接数组，如果 props.links 未提供，则默认为空数组。
 * 这是一个计算属性，以确保 links 始终是一个数组，避免在模板中出现 undefined 错误。
 * @returns {LinkItem[]}
 */
const links = computed(() => props.links ?? ([] as LinkItem[]))

/**
 * @description 品牌文本，如果 props.brand 未提供，则默认为 'Navbar Title'。
 * @returns {string}
 */
const brandText = computed(() => props.brand ?? 'Navbar Title')

/**
 * @description 品牌链接，如果 props.brandHref 未提供，则默认为 '#'。
 * @returns {string}
 */
const brandHref = computed(() => props.brandHref ?? '#')

/**
 * @description 判断品牌链接是否为内部路由链接 (以 '/' 开头)。
 * 这个计算属性用于在模板中决定使用 `<router-link>` 还是 `<a>` 标签。
 * @returns {boolean}
 */
const brandHrefInternal = computed(() => !!brandHref.value && brandHref.value.startsWith('/'))

// 获取 Vue Router 实例，用于编程式导航
const router = useRouter()

/**
 * @description 判断链接是否为内部路由链接。
 * @param {string} href - 待检查的链接。
 * @returns {boolean} - 如果链接以 '/' 开头，则返回 true，否则返回 false。
 * 此函数用于 v-for 循环中，以动态确定链接类型。
 */
function isInternal(href?: string) {
  return !!href && href.startsWith('/')
}

/**
 * @description 编程式导航到指定路径。
 * @param {string} path - 目标路径。
 * 这个方法被暴露出去，允许父组件通过 ref 调用以触发导航。
 */
function goTo(path: string) {
  router.push(path)
}

// 通过 defineExpose 暴露 goTo 方法，允许父组件通过 ref 调用
defineExpose({ goTo })
</script>

<!-- No component-scoped styles needed; daisyUI + Tailwind handle styling -->