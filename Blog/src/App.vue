<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { defSettings } from "./cssVars/defSettings.ts";
import { utils } from "./utils/utils.ts";
import { imageAPI } from "./http/getImage.ts";

import GithubLink from '@/components/GithubLink.vue';
import RouterViewPanel from '@/components/common/RouterViewPanel.vue';

/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 *
 *
 *      以下是当前的 bug
 * 路由切换动画时, 组件根元素如果没有应用 backdrop-fliter, 那么所有子 Card 的 backdrop-fliter 在路由切换动画进行时, 效果失效
 * 每个路由第一次加载的时候是没有动画的 (如果为 NavLayout.vue 添加了根元素，现在所有切换都有动画了，包括导航栏)
 * 路由切换时, 在 url 不同的情况下, 就不使用同一个缓存, 即使他们都包含相同的子组件 (SettingsView.vue)
 * 路由切换后, 导航栏效果失效, 滚动页面后恢复
 * PostList.vue 中, 切换标签时 url 显示类似 tags=Tag1&tags=Tag2, 我需要的是 tags=Tag1,Tag2
 * PostList.vue 中, 每次切换标签时 tagTipShow 都会闪烁
 * PostList.vue 中, 每次刷新数据时 tipShow 都会闪烁
 * PostCard.vue 中, 单击标签按钮也会跳转至文章详情
 * RouterViewPanel.vue 中, 如果使用 <keep-alive>, 那么路由将不会在有退出动画
*/

const loadBgAsync = async () => {
  const body = document.querySelector("body");

  if (body) {
    try {
      const url = await imageAPI.getRandomImageUrl(0);
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

  <div class="container">
    <GithubLink />

    <RouterViewPanel />
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
