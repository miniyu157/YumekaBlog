<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { defSettings } from '@/cssVars/defSettings';

import { utils } from "./utils/utils.ts";
import { imageAPI } from "./http/getImage.ts";

import GithubLink from "@/components/GithubLink.vue";
import RouterViewPanel from "./components/common/RouterViewPanel.vue";


const loadBgAsync = async () => {
  const body = document.querySelector("body");

  if (body) {
    try {
      const url = await imageAPI.getRandomImageUrl(1);
      await defSettings.setBgUrlAsync(url);
      await utils.delay(500);

    } catch (error) {
      console.error('Failed to load image:', error);

    } finally {
      defSettings.maskOpacity.value = 0;
    }
  }
};

onMounted(loadBgAsync);

const isNavBlur = ref(false);
const scrollHandle = () => {
  isNavBlur.value = window.scrollY > 400;
}
onMounted(() => {
  window.addEventListener("scroll", scrollHandle);
})
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandle);
})

</script>

<template>

  <GithubLink />

  <div id="container">
    <RouterViewPanel/>
  </div>

</template>

<style scoped lang="scss">
#container {
  display: flex;
  flex-direction: column;
}
</style>
