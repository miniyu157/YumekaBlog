<script setup lang="ts">
import { httpget, type PostResponse } from '@/http/http';
import { onMounted, ref } from 'vue';
import FlexCore from '../common/FlexCore.vue';
import { utils } from '@/utils/utils';
import TagButton from '../common/TagButton.vue';
import SvgView from '../common/SvgView.vue';
import PostContainer from '../common/PostContainer.vue';
import { useRoute } from 'vue-router';
import LoadingTip from '../common/LoadingTip.vue';
import MarkdownRender from '../common/MarkdownRender.vue';

const postData = ref<PostResponse>();
const params = history.state.params;
const loadingTip = ref<[string, string]>([
    '加载文章详情...',
    '应该会很快的...(应该吧？)'
]);

const loadPost = async () => {
    if (params) {
        postData.value = JSON.parse(params);
    } else {
        try {
            const route = useRoute();
            const id = route.query.id;
            const response = await httpget.getPostById(String(id));

            postData.value = response;
        } catch (error: any) {
            console.log(error);

            loadingTip.value = [
                '与服务器的连接跑丢了呢...(*ﾟーﾟ)',
                error.message
            ];
        }
    }
};

onMounted(() => {
    loadPost();
});
</script>

<template>

    <PostContainer>

        <FlexCore v-if="postData" direction="column" gap="16px">
            <div class="title-panel">
                <span class="title">{{ postData?.title || '无标题文章' }}</span>
            </div>

            <div class="img-panel">
                <img :src="postData?.imageUrl"
                    @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=fail'">
            </div>

            <FlexCore main-axis="between" cross-axis="center">
                <span class="timespan small-text">发布于 {{ utils.formatDatetime(postData?.createdAt) || '未知时间' }}</span>

                <FlexCore direction="row" gap="8px">
                    <TagButton v-for="tag in postData?.tags" :text="tag" :key="tag" />
                </FlexCore>
            </FlexCore>

            <MarkdownRender class="content" :render-text="postData?.content || '文章内容竟然是空的(*ﾟーﾟ)'" />

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

        <LoadingTip v-else :texts="loadingTip" />
    </PostContainer>

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
}
</style>