<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from './BaseCard.vue';
import FlexCore from './FlexCore.vue';

const props = defineProps({
  title: {
    type: String,
    default: "CardTitle"
  },
  initialExpanded: {  // 控制初始展开状态
    type: Boolean,
    default: true
  },
  collapsible: {      // 控制折叠功能开关
    type: Boolean,
    default: false
  }
})

const isExpanded = ref(props.initialExpanded);

const toggleExpand = () => {
  if (props.collapsible) {
    isExpanded.value = !isExpanded.value;
  }
}

const contentVisible = computed(() => !props.collapsible || isExpanded.value)
</script>

<template>
  <Card>
    <FlexCore gap="4px">
      <FlexCore class="header" orientation="row" :style="{ cursor: collapsible ? 'pointer' : 'default' }"
        @click="toggleExpand">
        <h3 class="subtitle unline-height">{{ title }}</h3>
        <span v-if="collapsible" class="arrow" :class="{ 'arrow--collapsed': !isExpanded }">
          ▼
        </span>
      </FlexCore>

      <transition name="slide">
        <div v-show="contentVisible" class="content">
          <slot></slot>
        </div>
      </transition>
    </FlexCore>
  </Card>
</template>

<style scoped>
.header {
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.content {
  width: 100%;
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 0.8em;
}

/* 关闭时候箭头的样式 */
.arrow--collapsed {
  transform: rotate(-180deg);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  padding: 0 12px;
}
</style>
