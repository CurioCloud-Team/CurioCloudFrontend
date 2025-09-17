<script lang="ts" setup>
/**
 * @file Hero.vue
 * @description 一个可重用的 Hero 组件，用于显示带有标题、副标题和行动号召按钮的全屏背景图像。
 */

/**
 * 定义组件的 props。
 * @property {string} title - Hero 部分的主标题。
 * @property {string} subtitle - Hero 部分的副标题或描述性文本。
 * @property {string} buttonText - 行动号召按钮上显示的文本。
 * @property {string} [secondaryButtonText] - 次要行动号召按钮上显示的文本（可选）。
 * @property {string} [backgroundImage] - Hero 组件的背景图片 URL。
 */
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  secondaryButtonText: {
    type: String,
    required: false,
  },
  backgroundImage: {
    type: String,
    required: false,
    default: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
  },
});

/**
 * 处理行动号召按钮的点击事件。
 * 目前，它只是将一条消息记录到控制台。
 */
function onButtonClick() {
  console.log("Button clicked!");
}
</script>

<template>
  <!--
    Hero 组件的根元素。
    - `min-h-screen`确保它至少占据整个视口的高度。
    - 背景图像是内联设置的，但也可以通过 prop 传递以增加灵活性。
  -->
  <div
      class="hero min-h-screen"
      :style="{ 'background-image': backgroundImage }"
  >
    <!-- 背景图像上的叠加层，以提高文本的可读性 -->
    <div class="hero-overlay"></div>
    <!-- Hero 内容的容器，使其居中并设置样式 -->
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <!-- 动态显示标题 -->
        <h1 class="mb-5 text-5xl font-bold">{{ title }}</h1>
        <!-- 动态显示副标题 -->
        <p class="mb-5">
          {{ subtitle }}
        </p>
        <!--
          行动号召按钮。
          - `@click` 指令将 `onButtonClick` 函数绑定到点击事件。
        -->
        <div class="flex justify-center gap-4">
          <button v-if="secondaryButtonText" class="btn">
            {{ secondaryButtonText }}
          </button>
          <button class="btn btn-primary" @click="onButtonClick">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
