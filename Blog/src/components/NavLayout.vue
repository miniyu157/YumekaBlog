<script setup lang="ts">
import { cssVars } from '@/utils/cssVars';
import FlexCore from './common/FlexCore.vue';
import RVContainer from './common/RVContainer.vue';
import Card from './common/Card.vue';
import SvgView from './common/SvgView.vue';

</script>

<template>

    <FlexCore class="nav-layout" direction="column">

        <FlexCore cross-axis="baseline" gap="1em" class="mar-0auto title-panel">
            <span class="title">𝓨𝓾𝓶𝓮𝓴𝓪’𝓼</span>
            <span class="subtitle">𝑳𝒊𝒕𝒕𝒍𝒆 𝑵𝒆𝒔𝒕</span>
        </FlexCore>

        <nav class="mar-0auto main-nav">
            <FlexCore gap="12px" class="header-buttons" orientation="row">
                <h3 class="underline-from-center mar-0">
                    <RouterLink class="router-link" to="/home">首页</RouterLink>
                </h3>
                <h3 class="underline-from-center mar-0">
                    <RouterLink class="router-link" to="/blog">博客</RouterLink>
                </h3>
                <h3 class="underline-from-center mar-0">
                    <RouterLink class="router-link" to="/friend">友站</RouterLink>
                </h3>
                <h3 class="underline-from-center mar-0">
                    <RouterLink class="router-link" to="/about">关于</RouterLink>
                </h3>
            </FlexCore>
        </nav>

        <FlexCore direction="column" class="navlayout-container">
            <RVContainer />
        </FlexCore>

        <div class="bottom-mar"></div>
    </FlexCore>

</template>

<style scoped lang="scss">
$page-margin: 36vh;

.title-panel {
    margin-bottom: 8px;
    margin-top: calc($page-margin/2);

    .title {
        font-weight: bold;
        font-size: 66pt;

        -webkit-text-stroke: 2px var(--but-back);
        text-shadow: 2px 4px 4px var(--primary-fore-color);
    }

    .subtitle {
        font-weight: bold;
        font-size: 33pt;

        -webkit-text-stroke: 2px var(--but-back);
        text-shadow: 2px 4px 4px rgba(255, 0, 0, 0.5);
    }
}

.main-nav {
    position: sticky;
    top: 0;

    margin-bottom: calc($page-margin/2);

    z-index: 99; // 防止鼠标悬停 PostCard 的图片时被覆盖，原因未知
}

.navlayout-container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.bottom-mar {
    margin-bottom: $page-margin;
}
</style>