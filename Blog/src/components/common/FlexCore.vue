<template>
  <div class="flex-core" :class="[directionClass]" :style="panelStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';

enum JustifyContent {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
  between = 'space-between',
  around = 'space-around',
  evenly = 'space-evenly',
}

enum AlignItems {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
  baseline = 'baseline',
  stretch = 'stretch'
}

const props = defineProps({
  direction: {
    type: String as PropType<'row' | 'column'>,
    default: 'row',
    validator: (value: any) => ['row', 'column'].includes(value)
  },
  mainAxis: {
    type: String as PropType<keyof typeof JustifyContent>,
    default: undefined,
    validator: (value: any) => !value || Object.keys(JustifyContent).includes(value)
  },
  crossAxis: {
    type: String as PropType<keyof typeof AlignItems>,
    default: undefined,
    validator: (value: any) => !value || Object.keys(AlignItems).includes(value)
  },
  flexWrap: {
    type: String as PropType<'nowrap' | 'wrap' | 'wrap-reverse'>,
    default: 'nowrap',
    validator: (value: any) => ['nowrap', 'wrap', 'wrap-reverse'].includes(value)
  },
  gap: {
    type: String,
    default: "0px"
  },
});

const directionClass = computed(() => `direction-${props.direction}`);

const panelStyle = computed(() => {
  const style: Record<string, string> = {
    gap: props.gap,
    flexDirection: props.direction,
    flexWrap: props.flexWrap
  };

  if (props.mainAxis) {
    style.justifyContent = JustifyContent[props.mainAxis];
  }
  if (props.crossAxis) {
    style.alignItems = AlignItems[props.crossAxis];
  }

  return style;
});
</script>

<style scoped>
.flex-core {
  display: flex;
}
</style>