<template>
  <div class="flex-core" :class="[orientationClass]" :style="panelStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  orientation: {
    type: String,
    default: 'column',
    validator: (value: string) => ['row', 'column'].includes(value)
  },
  gap: {
    type: String,
    default: "0px"
  },
  horizontalAlignment: {
    type: String,
    default: undefined,
    validator: (value?: string) =>
      !value || ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].includes(value)
  },
  verticalAlignment: {
    type: String,
    default: undefined,
    validator: (value?: string) =>
      !value || ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].includes(value)
  }
});

const orientationClass = computed(() => `orientation-${props.orientation}`);

const panelStyle = computed(() => {
  const style: Record<string, string> = { gap: props.gap };

  if (props.orientation === 'row') {
    if (props.horizontalAlignment) style.justifyContent = props.horizontalAlignment;
    if (props.verticalAlignment) style.alignItems = props.verticalAlignment;
  } else {
    if (props.verticalAlignment) style.justifyContent = props.verticalAlignment;
    if (props.horizontalAlignment) style.alignItems = props.horizontalAlignment;
  }

  return style;
});
</script>

<style scoped>
.flex-core {
  display: flex;
}

.flex-core.orientation-row {
  flex-direction: row;
}

.flex-core.orientation-column {
  flex-direction: column;
}
</style>
