<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
          <div class="navbar bg-base-300 w-full">
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div class="mx-2 flex-1 px-2">
              <router-link v-if="brandHrefInternal" :to="brandHref" class="font-bold">{{ brandText }}</router-link>
              <a v-else :href="brandHref" class="font-bold">{{ brandText }}</a>
            </div>
            <div class="hidden flex-none lg:block">
              <ul class="menu menu-horizontal">
                <li v-for="(item, i) in links" :key="i">
                  <router-link v-if="isInternal(item.href)" :to="item.href">{{ item.label }}</router-link>
                  <a v-else :href="item.href">{{ item.label }}</a>
                </li>
              </ul>
            </div>
          </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <li v-for="(item, i) in links" :key="`side-${i}`">
          <router-link v-if="isInternal(item.href)" :to="item.href">{{ item.label }}</router-link>
          <a v-else :href="item.href">{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composition API script - accept props for links and brand
import { computed } from 'vue'
import { useRouter } from 'vue-router'

type LinkItem = { label: string; href: string }

const props = defineProps<{
  links?: LinkItem[]
  brand?: string
  brandHref?: string
}>()

const links = computed(() => props.links ?? ([] as LinkItem[]))
const brandText = computed(() => props.brand ?? 'Navbar Title')
const brandHref = computed(() => props.brandHref ?? '#')
const brandHrefInternal = computed(() => !!brandHref.value && brandHref.value.startsWith('/'))

const router = useRouter()

function isInternal(href?: string) {
  return !!href && href.startsWith('/')
}

// Optional programmatic navigation
function goTo(path: string) {
  router.push(path)
}

defineExpose({ goTo })
</script>

<!-- No component-scoped styles needed; daisyUI + Tailwind handle styling -->