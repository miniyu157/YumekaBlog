<script setup lang="ts">
import FlexCore from "@/components/common/FlexCore.vue";
import SvgView from "@/components/common/SvgView.vue";

defineProps({
  title: {
    type: String,
    default: "Collection Name"
  },
  routerLink: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <FlexCore horizontal-alignment="space-between" orientation="row">
    <FlexCore vertical-alignment="center" class="subtitle" orientation="row" gap="6px">
      <SvgView name="grid" />
      <h3 class="unline-height">{{ title }}</h3>
    </FlexCore>

    <FlexCore v-on:click="$router.push(routerLink);" vertical-alignment="center" class="subtitle link-block more-button"
      orientation="row" gap="6px">
      <SvgView rotate="180deg" name="more" />
      <h3 class="unline-height">More</h3>
    </FlexCore>
  </FlexCore>
</template>

<style scoped>
.more-button {
  user-select: none;
}
</style>
