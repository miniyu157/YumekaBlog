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
 * 启动时路由切换动画失效 (启动动画)
 * RouterLink 指向不存在的页面时，点击它会跳转到空白的页面，手动刷新才显示 404
 * 404 组件有很多冗余属性, 因为它是 AI 生成的
 * PostList.vue 中, 分页按钮点击就会一闪一闪
 * PostList.vue 中, 切换标签时 url 显示类似 tags=Tag1&tags=Tag2, 我需要的是 tags=Tag1,Tag2
 * PostList.vue 中, 每次切换标签时 tagTipShow 都会闪烁
 * PostList.vue 中, 每次刷新数据时 tipShow 都会闪烁
 *
 * 单独写一个主页，博客在 /blog, 至于已有的 main.vue 和 home.vue, 换个名字吧
*/

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
    <RouterViewPanel />
  </div>

</template>

<style scoped lang="scss">
#container {
  display: flex;
  flex-direction: column;
}
</style>
