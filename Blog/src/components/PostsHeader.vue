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
  <FlexCore horizontal-alignment="space-between" orientation="row">
    <FlexCore vertical-alignment="center" class="subtitle" orientation="row" gap="6px">
      <SvgView name="grid" />
      <h3 class="unline-height">{{ title }}</h3>
    </FlexCore>

    <FlexCore vertical-alignment="center" class="subtitle link-block" orientation="row" gap="6px">
      <SvgView rotate="180deg" name="more" />
      <h3 class="unline-height">More</h3>
    </FlexCore>
  </FlexCore>
</template>
