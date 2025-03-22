<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { defSettings } from "./cssVars/defSettings";

import FlexCore from "@/components/FlexCore.vue";
import GithubLink from "@/components/GithubLink.vue";
import RouterViewPanel from "@/components/base/RouterViewPanel.vue";

import { utils } from "./utils/utils.ts";
import { imageAPI } from "./http/getImage.ts";

import router from "@/router/index.ts";

const title = ref("Welcome to Yumeka");

const loadBgAsync = async () => {
  const body = document.querySelector("body");

  if (body) {
    /* 设置此项可屏蔽启动时 body 透明度 to 0 的动画 */
    body.style.visibility = 'collapse';

    try {
      const url = await imageAPI.getRandomImageUrl(0);
      await defSettings.setBgUrlAsync(url);
      await utils.delay(500);

    } catch (error) {
      console.error('Failed to load image:', error);

    } finally {

      body.style.visibility = 'visible';
      body.style.opacity = '100%';
    }
  }
};

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

onMounted(loadBgAsync);
</script>

<template>

  <github-link />

  <div id="container">

    <flex-core gap="16px">

      <!-- header -->
      <h1 class="unline-height title">{{ title }}</h1>
      <nav id="main-nav">
        <flex-core gap="12px" class="header-buttons" :class="{ 'nav-blur': isNavBlur }" orientation="row">
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
        </flex-core>
      </nav>

      <!-- debug button -->
      <flex-core gap="16px" orientation="row">
        <button @click="debug" class="flat-button">Debug</button>
        <button @click="router.push('/create-post');" class="flat-button">Create Post</button>
      </flex-core>

      <!-- content -->
      <RouterViewPanel />

    </flex-core>
  </div>

</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 90%;
  padding-bottom: var(--header-height);

  margin: 0 auto;

  --header-gap: 24px;
  --header-height: 50vh;

  transition: all 1s ease;
}


.title {
  display: flex;

  cursor: default;
  font-family: "义启星空之翼", sans-serif;
  font-size: 50pt;
  min-width: 532px;
  height: calc(var(--header-height)/2);

  margin-bottom: var(--header-gap);

  justify-content: center;
  align-items: end;

  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

#main-nav {
  position: sticky;
  top: -1px;
  z-index: 999;
  height: calc(var(--header-height)/2);
  pointer-events: none;

  /* 使按钮的模糊宽度等于文档宽度 */
  width: 100vw;
  margin-left: calc(50% - 50vw);

  >.header-buttons {
    /*设置此属性auto后伪元素的hover生效，但不能穿透点击了，暂时搁置 */
    pointer-events: auto;

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
