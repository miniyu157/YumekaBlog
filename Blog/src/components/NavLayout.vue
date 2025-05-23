<script setup lang="ts">
import { cssVars } from '@/utils/cssVars';
import FlexCore from './common/FlexCore.vue';
import RVContainer from './common/RVContainer.vue';
import Card from './common/Card.vue';
import SvgView from './common/SvgView.vue';
import ThemeToggle from './common/ThemeToggle.vue';

</script>

<template>

    <FlexCore class="nav-layout" cross-axis="center" direction="column">

        <FlexCore cross-axis="baseline" gap="1em" class="title-panel">
            <span class="title">𝓨𝓾𝓶𝓮𝓴𝓪’𝓼</span>
            <span class="subtitle">𝑳𝒊𝒕𝒕𝒍𝒆 𝑵𝒆𝒔𝒕</span>
        </FlexCore>

        <nav class="main-nav">
            <FlexCore gap="16px">
                <Card class="links-panel" padding-size="small">
                    <FlexCore gap="8px">
                        <SvgView name="go" :fill="cssVars.primaryForeColor" />
                        <RouterLink class="router-link" to="/home">首页</RouterLink>
                        <RouterLink class="router-link" to="/blog">博客</RouterLink>
                        <RouterLink class="router-link" to="/friend">友站</RouterLink>
                        <RouterLink class="router-link" to="/about">关于</RouterLink>
                    </FlexCore>
                </Card>

                <ThemeToggle :show-text="false" />
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
    margin-bottom: 16px;
    margin-top: calc($page-margin/2);

    .title {
        font-weight: bold;
        font-size: 66pt;

        -webkit-text-stroke: 2px var(--but-back);
        text-shadow: 2px 4px 4px hsla(224, 100%, 50%, 0.5);
    }

    .subtitle {
        font-weight: bold;
        font-size: 33pt;

        -webkit-text-stroke: 2px var(--but-back);
        text-shadow: 2px 4px 4px hsla(0, 100%, 50%, 0.50);
    }
}

.main-nav {
    position: sticky;
    top: 1em;
    z-index: 99; // 防止鼠标悬停 PostCard 的图片时被覆盖
    user-select: none;

    margin-bottom: calc($page-margin/2);
    background-color: rgba($color: black, $alpha: 0);

    .links-panel .router-link {
        transition: color 0.2s;

        &:hover {
            color: var(--primary-fore-color);
        }
    }
}

.navlayout-container {
    width: 90%;
    max-width: 1200px;
}

.bottom-mar {
    margin-bottom: $page-margin;
}
</style>