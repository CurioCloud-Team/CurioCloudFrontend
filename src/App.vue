<script setup lang="ts">
/*
  App.vue（入口布局）
  - 维护全局/顶栏的导航链接列表（navLinks）
  - navLinks 是一个响应式 ref，包含 label 与 href 字段
  - 如需增加子菜单、图标或权限控制，可将每个项扩展为包含更多字段（如 children, icon, roles）
*/
import Header from './components/Header.vue'
import { ref } from 'vue'

const navLinks = ref([
  // 每一项必须至少包含 label 与 href；可在未来扩展字段
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Contact', href: '#' }
])
</script>

<template>
  <!--
    顶部 Header：传入 links（响应式）、brand 与 brandHref
    说明：Header 负责响应式与可访问性（ARIA）细节，App 仅提供数据与页面结构
  -->
  <Header :links="navLinks" brand="CurioCloud" brandHref="#" />
</template>
