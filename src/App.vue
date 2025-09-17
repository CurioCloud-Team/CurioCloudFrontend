<script setup lang="ts">
/*
  App.vue（入口布局）
  - 维护全局/顶栏的导航链接列表（navLinks）
  - navLinks 是一个响应式 ref，包含 label 与 href 字段
  - 如需增加子菜单、图标或权限控制，可将每个项扩展为包含更多字段（如 children, icon, roles）
*/
import Header from './components/Header.vue'
import Hero from "./components/Hero.vue";
import {ref} from 'vue'

const navLinks = ref([
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: 'https://example.com/docs' }
])
</script>

<template>
  <!--
    顶部 Header：传入 links（响应式）、brand 与 brandHref
    说明：Header 负责响应式与可访问性（ARIA）细节，App 仅提供数据与页面结构
  -->
  <Header :links="navLinks" brand="CurioCloud" brandHref="/" />
  <Hero
      buttonText="Get Started"
      subtitle="更懂你的辅助备课系统"
      title="课研云"
  />
</template>
