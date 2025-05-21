<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { cssVars } from './utils/cssVars';
import RVContainer from './components/common/RVContainer.vue';
import { httpget } from './http/http';
import FlexCore from './components/common/FlexCore.vue';


const isBgLoaded = ref(false);

const loadBg = async () => {
    try {
        const url = await httpget.getRandomImage();

        const img = new Image();
        img.onload = () => {
            cssVars.bgUrl.value = url;
            isBgLoaded.value = true; // 图片加载完成时更新状态
        };
        img.onerror = () => {
            console.error('图片加载失败');
            isBgLoaded.value = true; // 失败时仍然显示内容（可选）
        };
        img.src = url; // 开始加载图片

    } catch (error) {
        console.error('图片加载失败');
        isBgLoaded.value = true; // 失败时仍然显示内容（可选）
    };
}

onMounted(loadBg);
</script>

<template>

    <div class="container">
        <div v-if="!isBgLoaded" class="loading">
            Loading...
        </div>

        <RVContainer v-if="isBgLoaded" />
    </div>

</template>

<style scoped lang="scss">
.loading {
    font-size: 40pt;
}

.container {
    min-height: 100vh;
}
</style>
