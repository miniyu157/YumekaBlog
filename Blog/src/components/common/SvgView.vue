<script setup lang="ts">
import { defineProps, computed } from 'vue';
import svgData from '@/assets/svgData.ts';

const props = defineProps({
  name: { type: String, required: true },
  rotate: { type: String, default: "0deg" },
  translate: { type: String, default: "0px,0px" },
  fill: { type: String, default: 'currentColor' },
  size: { type: String, default: '1.5em' }
});

const svgMeta = computed(() => {
  const meta = svgData[props.name];
  if (!meta) console.warn(`SVG "${props.name}" not found`);
  return meta || { viewBox: "0 0 24 24", path: [] };
});

const transformStyle = computed(() => ({
  transform: `translate(${props.translate}) rotate(${props.rotate})`
}));
</script>

<template>
  <svg v-if="svgMeta.viewBox && svgMeta.path.length" xmlns="http://www.w3.org/2000/svg" :viewBox="svgMeta.viewBox"
    :style="transformStyle" :width="size" :height="size">
    <path v-for="(path, index) in svgMeta.path" :key="index" :fill="fill" :d="path" />
  </svg>
</template>
