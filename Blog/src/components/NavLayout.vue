<script setup lang="ts">
import { cssVars } from '@/utils/cssVars';
import FlexCore from './common/FlexCore.vue';
import RVContainer from './common/RVContainer.vue';
import Card from './common/Card.vue';
import SvgView from './common/SvgView.vue';

</script>

<template>

    <FlexCore class="nav-layout" direction="column">

        <h1 class="mar-0auto title">Yumeka の 小窝</h1>

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

.title {
    font-family: "义启星空之翼", sans-serif;
    font-size: 66px;
    margin-bottom: 8px;

    margin-top: $page-margin/2;
}

.main-nav {
    position: sticky;
    top: 0;

    margin-bottom: ($page-margin/2);

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