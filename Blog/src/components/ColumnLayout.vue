<script setup lang="ts">
import { cssVars } from '@/utils/cssVars';
import Card from './common/Card.vue';
import FlexCore from './common/FlexCore.vue';
import RVContainer from './common/RVContainer.vue';
import TagButton from './common/TagButton.vue';
import { httpget, type TagsResponse } from '@/http/http';
import { onMounted, ref } from 'vue';
import SvgView from './common/SvgView.vue';
import LoadingTip from './common/LoadingTip.vue';

const tags = ref<TagsResponse>();

const loadingTip = ref<[string, string]>([
    '加载标签列表...',
    '应该会很快的...(应该吧？)'
]);

const loadTags = async () => {
    try {
        const data = await httpget.getAllTags();
        tags.value = data;

        loadingTip.value = [
            data.count == 0 ? '标签列表竟然是空的...(*ﾟーﾟ)' : '',
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

const postsCount = ref(0);

onMounted(async () => {
    loadTags();

    const postResponse = await httpget.getPosts({});
    postsCount.value = postResponse.pagination.total;
});

</script>

<template>

    <FlexCore gap="16px" direction="column">

        <div class="main-grid">
            <FlexCore direction="column" gap="16px">
                <Card>
                    <FlexCore class="header-panel" direction="column" gap="16px" cross-axis="center">
                        <div class="avatar w-60pct">
                            <div class="avatar-filter"></div>
                            <img src="../assets/images/avatar.jpg">
                        </div>

                        <h2 class="mar-0">Yumeka</h2>

                        <div class="header-info gap-x-8">
                            <span>文章</span>
                            <span>标签</span>
                            <span>浏览</span>
                            <span>{{ postsCount }}</span>
                            <span>{{ tags?.count || 0 }}</span>
                            <span>{{ 0 }}</span>
                        </div>

                        <button class="def-big-but but-shadow w-60pct">全部文章</button>
                    </FlexCore>
                </Card>

                <Card>
                    <FlexCore class="search-panel" main-axis="between" gap="8px">
                        <SvgView name="ai" :fill="cssVars.primaryForeColor" />
                        <input placeholder="搜点什么...">
                        <button class="def-small-but">Go</button>
                    </FlexCore>
                </Card>

                <Card>
                    <FlexCore class="tags-panel" flex-wrap="wrap" gap="8px">
                        <LoadingTip :texts="loadingTip" />
                        <TagButton v-for="tag in tags?.tags" :text="tag" :key="tag" />
                    </FlexCore>
                </Card>

                <Card class="music-panel">
                    <FlexCore gap="8px">
                        <SvgView name="music" :fill="cssVars.primaryForeColor" />
                        <span>放在 ColumnLayout</span>
                    </FlexCore>
                </Card>

                <Card>
                    <FlexCore direction="column" gap="8px">
                        <h3 class="mar-0">This a card</h3>
                        <span>Enim deserunt in. Ullamco id eu incididunt ullamco fugiat aliquip. Velit consectetur eu
                            aliqua Lorem ipsum reprehenderit.</span>
                    </FlexCore>
                </Card>
            </FlexCore>

            <RVContainer class="a-self-start" />
        </div>

    </FlexCore>

</template>

<style scoped lang="scss">
.main-grid {
    display: grid;
    grid-template-columns: 22fr 78fr;
    gap: 16px;
}

@media (max-width: 1100px) {
    .main-grid {
        grid-template-columns: 3fr 7fr;
    }
}

%absolute-style {
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
}

.header-panel {
    padding: 8px 0;

    .avatar {
        position: relative;
        user-select: none;

        .avatar-filter {
            position: absolute;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            box-shadow: inset 0 0 8px 4px var(--card-back);
        }

        img {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
            box-sizing: border-box;
            display: block; // 消除莫名其妙的下边距
        }


        &::after {
            @extend %absolute-style;

            animation: rotate-anim 8s linear infinite;
            border: 2px solid hsla(var(--primary-hue), var(--avatar-box-sl), 0.6);
        }

        &::before {
            @extend %absolute-style;

            animation: rotate-anim 12s linear infinite;
            border: 2px solid hsla(var(--primary-hue), var(--avatar-box-sl), 0.3);
        }
    }

    .header-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }
}

@keyframes rotate-anim {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.search-panel {
    input {
        background-color: transparent;
        flex-grow: 1;
    }

    button {
        flex-shrink: 0;
    }
}

.tags-panel>.tag-button {
    flex-grow: 1;
}
</style>