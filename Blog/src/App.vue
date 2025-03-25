<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { defSettings } from "./cssVars/defSettings";

import FlexCore from "@/components/base/FlexCore.vue";
import GithubLink from "@/components/GithubLink.vue";
import RouterViewPanel from "@/components/base/RouterViewPanel.vue";

import { utils } from "./utils/utils.ts";
import { imageAPI } from "./http/getImage.ts";

const title = ref("Welcome to Yumeka");

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

const debug = () => {
  defSettings.isDebug.value = !defSettings.isDebug.value;
};
</script>

<template>

  <GithubLink />

  <div id="container">

    <div class="container-backdrop">

    </div>
    <!-- header -->
    <h1 class="unline-height title">{{ title }}</h1>

    <nav id="main-nav">
      <FlexCore gap="12px" class="header-buttons" :class="{ 'nav-blur': isNavBlur }" orientation="row">
        <h3 class="underline-from-center">
          <router-link class="router-link" to="/">首页</router-link>
        </h3>
        <h3 class="underline-from-center">
          <router-link class="router-link" to="/">文件</router-link>
        </h3>
        <h3 class="underline-from-center">
          <router-link class="router-link" to="/">友站</router-link>
        </h3>
        <h3 class="underline-from-center">
          <router-link class="router-link" to="/about">关于</router-link>
        </h3>
      </FlexCore>
    </nav>

    <FlexCore class="content" gap="16px">
      <!-- debug button -->
      <!-- <FlexCore gap="16px" orientation="row">
        <button @click="debug" class="flat-button">Debug</button>
      </FlexCore> -->

      <!-- content -->
      <RouterViewPanel />

    </FlexCore>
  </div>

</template>

<style scoped lang="scss">
$header-height: 55vh;
$header-gap: 36px;

#container {
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;

  margin-bottom: $header-height;
}

.title {
  display: flex;

  cursor: default;

  font-family: "义启星空之翼", sans-serif;
  font-size: 50pt;
  min-width: 532px;
  height: calc($header-height / 2);
  margin: 0;
  margin-bottom: $header-gap;

  justify-content: center;
  align-items: end;

  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

#main-nav {
  position: sticky;
  top: -1px;
  z-index: 999;
  height: calc($header-height/2);
  pointer-events: none;

  >.header-buttons {
    /*设置此属性auto后伪元素的hover生效，但不能穿透点击了，暂时搁置 */
    pointer-events: none;

    justify-content: center;
    padding: 8px;

    >h3 {
      opacity: 85%;
      margin: 0;

      pointer-events: auto;
    }
  }

  >.header-buttons::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    width: 100%;

    mask: linear-gradient(to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.66) 40%,
        rgba(0, 0, 0, 0) 100%);

    transition: all 0.1s ease;
  }
}

/* 高亮导航栏 */
.header-buttons.nav-blur::before {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.3);
}

.header-buttons.nav-blur:hover::before {
  background-color: rgba(0, 0, 0, 0.5);
}

</style>
