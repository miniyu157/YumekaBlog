<script setup lang="ts">
import { httpget, type PostResponse } from '@/http/http';
import { onMounted, ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import Card from '../common/Card.vue';
import FlexCore from '../common/FlexCore.vue';
import { utils } from '@/utils/utils';
import TagButton from '../common/TagButton.vue';
import SvgView from '../common/SvgView.vue';

const route = useRoute();
const id = route.query.id;
const postData = ref<PostResponse>();

const tip = ref('加载中...');

const loadPost = async () => {
    try {
        const response = await httpget.getPostById(String(id));
        postData.value = response;
    } catch (error: any) {
        tip.value = `拉取文章失败(${error})`;
    }
}

onMounted(() => {
    loadPost();
});
</script>

<template>

    <Card v-if="postData">
        <FlexCore direction="column" gap="8px">
            <div class="title-panel">
                <span class="title">{{ postData?.title }}</span>
            </div>

            <div class="img-panel">
                <img :src="postData?.imageUrl">

                <button @click="$router.back" class="back-button def-medium-but a-self-start">
                    <FlexCore gap="4px">
                        <SvgView name="back" scale="0.8" />
                        <span>返回</span>
                    </FlexCore>
                </button>
            </div>

            <FlexCore main-axis="between" cross-axis="center">
                <span class="timespan small-text">发布于 {{ utils.formatDatetime(postData?.createdAt) }}</span>

                <FlexCore direction="row" gap="8px">
                    <TagButton v-for="tag in postData?.tags" :text="tag" :key="tag" />
                </FlexCore>
            </FlexCore>

            <p class="content mar-0">{{ postData?.content }}</p>

            <FlexCore gap="8px" direction="row" cross-axis="center">
                <button class="def-medium-but">
                    <FlexCore gap="4px">
                        <SvgView name="like" />
                        <span>{{ postData?.heat }}</span>
                    </FlexCore>
                </button>
                <button class="def-medium-but">
                    <FlexCore gap="4px">
                        <SvgView name="comment" />
                        <span>{{ postData?.comments }}</span>
                    </FlexCore>
                </button>

                <FlexCore class="mar-left-a" gap="4px">
                    <SvgView name="heat" />
                    <span>{{ postData?.heat }}</span>
                </FlexCore>
            </FlexCore>
        </FlexCore>
    </Card>

    <span v-else>{{ tip }}</span>
</template>

<style scoped lang="scss">
@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.skeleton-item {
    background: linear-gradient(90deg,
            hsl(0, 0%, 90%) 25%,
            hsl(0, 0%, 98%) 50%,
            hsl(0, 0%, 90%) 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite linear;
    border-radius: 4px;
}


.title-panel>.title {
    position: relative;
    font-size: 35pt;
    font-weight: bold;
    color: currentColor;
}

.img-panel {
    position: relative;
    border: 1px solid rgba(109, 109, 109, 0.5);
    border-radius: var(--big-corner);
    overflow: hidden;
    width: 100%;

    img {
        display: block; // 消除莫名其妙的下边距
        width: 100%;
        height: 200px;

        object-fit: cover;
    }

    .back-button {
        position: absolute;
        top: 0;
        margin: 8px;
    }
}

.content {
    font-size: 14pt;
}
</style>