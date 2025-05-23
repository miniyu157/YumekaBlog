<script setup lang="ts">
import { ref } from 'vue';
import PostContainer from '../common/PostContainer.vue';
import MarkdownRender from '../common/MarkdownRender.vue';

const markdownText = ref(`
# Yumeka の 小窝 🍃

轻量级个人博客, 持续进化中~ ✨

> 源代码 [miniyu157/YumekaBlog](https://github.com/miniyu157/YumekaBlog)

### 项目使用

- 客户端: Vue3
- 服务端: Node.js Express
- 数据库: MongoDB

### 开源许可

[MIT license](https://github.com/miniyu157/YumekaBlog/blob/master/LICENSE)

`);
</script>

<template>

  <PostContainer>
    <MarkdownRender :render-text="markdownText" />
  </PostContainer>

</template>

<style scoped lang="scss">
.card {
  padding: 45px !important;
}

.markdown-body {
  background: transparent;
  box-sizing: border-box;
}
</style>