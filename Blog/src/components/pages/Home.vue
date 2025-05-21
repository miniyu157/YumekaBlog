<script setup lang="ts">
import FlexCore from '../common/FlexCore.vue'
</script>

<template>

    <FlexCore class="container" direction="column" cross-axis="start" gap="16px">
        <FlexCore cross-axis="center" gap="8px">
            <div class="rectangle"></div>
            <h1>页面索引 - Yumeka の 小窝</h1>
        </FlexCore>

        <RouterLink class="link router-link" to="/home">✓ 首页 (/home)</RouterLink>
        <RouterLink class="link router-link" to="/blog">✓ 博客 (/blog)</RouterLink>
        <RouterLink class="link router-link" to="/friend">✓ 友站 (/friend)</RouterLink>
        <RouterLink class="link router-link" to="/about">✕ 关于 (/about)</RouterLink>
        <RouterLink class="link router-link" to="/postlist">✕ 文章列表 (/postlist)</RouterLink>
        <RouterLink class="link router-link" to="/blog/postview">✓ 文章详情 (/blog/postview)</RouterLink>
        <RouterLink class="link router-link" to="/:pathMatch(.*)*">✕ 404 Not Found (/:pathMatch(.*)*)</RouterLink>
        <div @click="$router.back" class="back-button">返回</div>
    </FlexCore>

</template>

<style scoped lang="scss">
.container {
    padding-left: 25vh;
    padding-top: 20vh;
}

.rectangle {
    width: 4px;
    height: 3em;
    background-color: var(--primary-fore-color);
    border-radius: var(--infinite-corner);
}

%base-style {
    background: var(--card-back);
    border: 1px solid var(--primary-but-border);
    transition: background 0.2s, scale 0.2s;
    border-radius: var(--medium-corner);
    padding: 4px 16px;
    user-select: none;

    &:hover {
        // background: hsl(var(--primary-hue), 80%, 20%); // dark theme
        background: hsl(var(--primary-hue), 80%, 90%); // light theme
    }

    &:active {
        scale: 0.9;
    }
}

.back-button {
    @extend %base-style;
    padding: 4px 16px;
}

.link {
    @extend %base-style;
    padding: 16px 48px;
}
</style>