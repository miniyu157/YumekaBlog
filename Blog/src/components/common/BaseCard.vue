<template>
  <div :class="[flat ? 'flatCard' : 'card']">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  flat: Boolean
})
</script>

<style scoped>
.card {
  padding: 1rem;
  border-radius: var(--card-corner-radius);
  border: var(--default-card-border);
  background-color: var(--card-background);
  box-shadow: var(--default-box-shadow);

  backdrop-filter: var(--card-blur) var(--card-saturate);

  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: var(--hover-box-shadow);
}

.flatCard {
  padding: 1rem;
  border-radius: var(--card-corner-radius);
  border: var(--flat-card-border);
  background-color: transparent;
}
</style>
