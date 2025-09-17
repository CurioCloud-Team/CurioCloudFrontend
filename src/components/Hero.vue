<script lang="ts" setup>
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
});

function onButtonClick() {
  console.log("Button clicked!");
}
</script>

<template>
  <div
      class="hero min-h-screen"
      style="
      background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);
    "
  >
    <div class="hero-overlay"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">{{ title }}</h1>
        <p class="mb-5">
          {{ subtitle }}
        </p>
        <button class="btn btn-primary" @click="onButtonClick">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>
