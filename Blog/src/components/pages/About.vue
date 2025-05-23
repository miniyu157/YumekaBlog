<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import Card from '../common/Card.vue';
import FlexCore from '../common/FlexCore.vue';
import SvgView from '../common/SvgView.vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { cssVars } from '@/utils/cssVars';

const loadStyles = async () => {
  if (cssVars.isDarkTheme.value) {
    await import("@/assets/github-markdown-css/github-markdown-dark.css");
    await import('highlight.js/styles/github-dark.css');
  } else {
    await import("@/assets/github-markdown-css/github-markdown-light.css");
    await import('highlight.js/styles/github.css');
  }
};

loadStyles();

const md = new MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true
        }).value
          }</code></pre>`;
      } catch (__) { }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
}) as MarkdownIt;

const markdownText = ref(`
# Yumeka の 小窝 🍃

轻量级个人博客, 持续进化中~ ✨

> 源代码 [miniyu157/YumekaBlog](https://github.com/miniyu157/YumekaBlog)

### 项目使用

- 客户端: Vue3
- 服务端: Node.js Express
- 数据库: MongoDB

### 代码高亮测试 (temp)

\`\`\` typescript
app.get("/api/friendlinks", async (req, res) => {
  try {
    const links = await friendLinkModel.find().lean();

    res.status(200).json({
      success: true,
      message: \`请求成功\`,
      count: links.length,
      links: links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: \`服务器错误，请稍后重试\`,
    });
  }
});
\`\`\`
`);
</script>

<template>

  <Card>
    <button @click="$router.back" class="back-button def-medium-but a-self-start">
      <FlexCore gap="4px">
        <SvgView name="back" scale="0.8" />
        <span>返回</span>
      </FlexCore>
    </button>

    <article class="markdown-body" v-html="md.render(markdownText)"></article>
  </Card>

</template>

<style scoped lang="scss">
.card {
  padding: 45px !important;
}

button {
  margin-bottom: 2em;
}

.markdown-body {
  background: transparent;
  box-sizing: border-box;

  >pre >code{
    visibility: collapse !important;
  }
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>