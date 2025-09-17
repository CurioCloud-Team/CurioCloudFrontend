<script setup lang="ts">
/*
  App.vue（入口布局）
  - 维护全局/顶栏的导航链接列表（navLinks）
  - navLinks 是一个响应式 ref，包含 label 与 href 字段
  - 如需增加子菜单、图标或权限控制，可将每个项扩展为包含更多字段（如 children, icon, roles）
*/
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'

const navLinks = ref([
  { label: '主页', href: '/' },
  { label: '关于', href: '/about' },
  { label: '文档', href: 'https://example.com/docs' }
])
</script>

<template>
  <!--
    顶部 Header：传入 links（响应式）、brand 与 brandHref
    说明：Header 负责响应式与可访问性（ARIA）细节，App 仅提供数据与页面结构
  -->
  <Header :links="navLinks" brand="CurioCloud" brandHref="/" />
  <Hero
    buttonText="开始使用"
    secondaryButtonText="了解更多"
    subtitle="更懂你的辅助备课系统"
    title="课研云"
    backgroundImage="url(https://cdn.pixabay.com/photo/2017/09/11/15/58/sunset-2739472_1280.jpg)"
  />
  <Footer brand="CurioCloud" svgSrc="../public/logo.svg" />
</template>
