<script setup lang="ts">
import PostCard from '../common/PostCard.vue';

import { httpget, type PostsApiResponse } from '../../http/http';
import { onMounted, ref } from 'vue';
import FlexCore from '../common/FlexCore.vue';
import Card from '../common/Card.vue';
import SvgView from '../common/SvgView.vue';
import LoadingTip from '../common/LoadingTip.vue';
import { cssVars } from '@/utils/cssVars';
import ThemeToggle from '../common/ThemeToggle.vue';

const postResponse = ref<PostsApiResponse>();

const loadingTip = ref<[string, string]>([
    '加载文章列表...',
    '应该会很快的...(应该吧？)'
]);

const loadPosts = async () => {
    try {
        const response = await httpget.getPosts({
            limit: 6,
            sort: '-createdAt'
        });
        postResponse.value = response;

        loadingTip.value = [
            response.pagination.total == 0 ? '文章列表竟然是空的...(*ﾟーﾟ)' : '',
            '网络很正常，数据库空空'
        ];

    } catch (error: any) {
        console.log(error);

        loadingTip.value = [
            '与服务器的连接跑丢了呢...(*ﾟーﾟ)',
            error.message
        ];
    }
};

onMounted(() => {
    loadPosts();
});

</script>

<template>

    <FlexCore direction="column" gap="16px">
        <Card>
            <FlexCore gap="8px">
                <SvgView name="announcement" :fill="cssVars.primaryForeColor" />
                <span>应在这里显示公告</span>
            </FlexCore>
        </Card>

        <FlexCore gap="16px" class="menu mar-left-a">
            <ThemeToggle />

            <Card class="group-menu" padding-size="small">
                <FlexCore gap="8px">
                    <FlexCore gap="4px">
                        <SvgView name="group" :fill="cssVars.primaryForeColor" />
                        <span>默认分组</span>
                    </FlexCore>

                    <div class="split-line"></div>

                    <FlexCore class="more-button" gap="4px">
                        <span>更多</span>
                        <SvgView name="more" rotate="180deg" :fill="cssVars.primaryForeColor" />
                    </FlexCore>
                </FlexCore>
            </Card>
        </FlexCore>

        <LoadingTip :texts="loadingTip" />

        <div class="main-grid">
            <PostCard v-for="post in postResponse?.data" v-bind="post" />
        </div>

    </FlexCore>

</template>

<style scoped lang="scss">
@keyframes card-enter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.menu {
    font-size: 0.9em;
    user-select: none;

    span {
        pointer-events: none;
    }

    .group-menu {
        .split-line {
            width: 2px;
            background-color: currentColor;
            opacity: 0.5;
        }

        .more-button {
            cursor: pointer;
            transition: transform 0.3s;

            &:hover {
                transform: translateX(4px);
            }
        }
    }
}

.main-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .post-card {
        opacity: 0;
        animation: card-enter 0.6s forwards;

        // 每个卡片依次延迟
        @for $i from 1 through 6 {
            &:nth-child(#{$i}) {
                animation-delay: 0.1s * $i;
            }
        }
    }
}

@media (max-width: 1100px) {
    .main-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>