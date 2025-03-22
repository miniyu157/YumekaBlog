<script setup lang="ts">
import FlexCore from "@/components/base/FlexCore.vue";
import SvgView from "@/components/base/SvgView.vue";

defineProps({
  title: {
    type: String,
    default: "Collection Name"
  }
})
</script>

<template>
  <flex-core horizontal-alignment="space-between" orientation="row">
    <flex-core vertical-alignment="center" class="subtitle" orientation="row" gap="6px">
      <svg-view name="grid" />
      <h3 class="unline-height">{{ title }}</h3>
    </flex-core>

    <flex-core vertical-alignment="center" class="subtitle link-block" orientation="row" gap="6px">
      <svg-view rotate="180deg" name="more" />
      <h3 class="unline-height">More</h3>
    </flex-core>
  </flex-core>
</template>
