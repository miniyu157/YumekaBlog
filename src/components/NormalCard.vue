<script setup lang="ts">
import Card from "@/components/BaseCard.vue";
import StackPanel from "@/components/StackPanel.vue";

defineProps({
  title: {
    type: String,
    default: "CardTitle"
  }
})
</script>

<template>
  <card>
    <stack-panel gap="4px">
      <h3 class="subtitle unline-height">{{ title }}</h3>
      <!-- <div class="content"> -->
      <slot></slot>
      <!-- </div> -->

    </stack-panel>
  </card>
</template>

<style scoped>
.content {
  margin: 0;
  width: 100%;
}
</style>
