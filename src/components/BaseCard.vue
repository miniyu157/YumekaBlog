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
  border-radius: 16px;
  border: 0px solid;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: 0px 0px 20px 6px rgba(0, 0, 0, 0.4);
}

.flatCard {
  padding: 16px;
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.8);
  background-color: transparent;
}
</style>
