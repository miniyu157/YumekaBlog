<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { cssVars } from '@/utils/cssVars';

const props = defineProps({
    renderText: {
        type: String,
    }
});

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


</script>

<template>

    <div v-if="props.renderText" class="markdown-render markdown-body" v-html="md.render(props.renderText)"></div>

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