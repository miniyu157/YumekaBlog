<template>
  <div :class="[props.flat ? 'flatCard' : 'card']" @mouseover="hover = true" @mouseleave="hover = false">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  flat: Boolean
})

const hover = ref(false)
</script>

<style scoped>
.card {
  padding: 16px;
  border-radius: var(--card-corner-radius);
  border: var(--default-card-border);
  background-color: var(--default-background);
  box-shadow: var(--default-box-shadow);
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: var(--hover-box-shadow);
}

.flatCard {
  padding: 16px;
  border-radius: var(--card-corner-radius);
  border: var(--flat-card-border);
  background-color: transparent;
}
</style>
