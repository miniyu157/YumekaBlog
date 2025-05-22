<script setup lang="ts">
import { ref } from 'vue';
import Card from '../common/Card.vue';
import FlexCore from '../common/FlexCore.vue';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css';
import SvgView from '../common/SvgView.vue';


const md = new MarkdownIt();

const markdownText = ref(`
# Yumeka の 小窝 🍃

轻量级个人博客, 持续进化中~ ✨

> 此仓库为 v2 版本, v1 前往 [YumekaBlog.Old](https://github.com/miniyu157/YumekaBlog.Old)

### 项目使用

- 客户端: Vue3
- 服务端: Node.js Express
- 数据库: MongoDB

### 代码演示

\`\`\`
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

        <article v-html="md.render(markdownText)" class="markdown-body"></article>
    </Card>

</template>

<style scoped lang="scss">
.card {
    padding: 45px !important;
}

button {
    margin-bottom: 1em;
}

.markdown-body {
    background: transparent;
    color: currentColor;

    a {
        color: red;
    }
}
</style>