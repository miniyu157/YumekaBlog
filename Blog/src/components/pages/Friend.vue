怎么添加链接卡片的加载动画
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LinkCard from '@/components/LinkCard.vue';
import type { LinkInfo } from '@/utils/types';
import { getLinkInfos } from '@/http/getLinkInfos';

const links = ref<LinkInfo[]>([]);
const tip = ref('正在加载列表...');

onMounted(async () => {
    try {
        const data = await getLinkInfos();

        if (data.length === 0) {
            tip.value = '列表为空';
            return;
        }

        links.value = data.map(link => ({
            ...link,
            image: `http://localhost:3000${link.image}`
        }));

        tip.value = '';
    } catch (error: any) {
        console.error(error.message);
        tip.value = '列表加载失败';
    }
});
</script>

<template>
    <div class="container">
        <h1 v-if="tip.length != 0" class="tip">{{ tip }}</h1>

        <div class="main-grid">
            <LinkCard v-for="(linkInfo, index) in links" :key="index" v-bind="linkInfo" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.tip {
    text-align: center;
}
</style>