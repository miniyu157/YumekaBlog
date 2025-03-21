<template>
  <div class="stack-panel" :class="[orientationClass]" :style="{ gap: gap }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  orientation: {
    type: String,
    default: 'vertical',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  },
  gap: {
    type: String,
    default: '16px'
  }
});

const orientationClass = computed(() => `orientation-${props.orientation}`);
</script>

<style scoped>
.stack-panel {
  display: flex;
  width: 100%;
}

.stack-panel.orientation-horizontal {
  flex-direction: row;
}

.stack-panel.orientation-vertical {
  flex-direction: column;
}
</style>
