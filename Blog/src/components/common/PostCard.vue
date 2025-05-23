<script setup lang="ts">
import Card from './Card.vue';
import FlexCore from './FlexCore.vue';

import { type PostResponse } from '../../http/http';
import TagButton from './TagButton.vue';
import SvgView from './SvgView.vue';
import { utils } from '@/utils/utils';
import { routeUtils } from '@/router';

const props = defineProps<PostResponse>();

const openPostView = () => {
    routeUtils.openNewPost(props);
}
</script>

<template>

    <Card class="post-card" padding-size="no">
        <div class="main-grid">
            <div class="bg">
                <img @click="openPostView" :src="props.imageUrl"
                    @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=fail'">
            </div>

            <FlexCore direction="column" class="cont pad-8" main-axis="between">
                <div>
                    <span class="timespan small-text">发布于 {{ utils.formatDatetime(props.createdAt) || '未知时间' }}</span>
                    <h3 @click="openPostView" class="title text-truncate mar-0">{{ props.title || '无标题文章' }}</h3>
                </div>

                <div>
                    <FlexCore class="postmeta small-text">
                        <SvgView name="heat" fill="hsl(10, var(--icon-sl))" />
                        <span>{{ utils.formatNumber(props.heat) }}热度</span>

                        <SvgView name="comment" scale="0.9" fill="hsl(190, var(--icon-sl))" />
                        <span>{{ utils.formatNumber(props.comments) }}评论</span>

                        <SvgView name="like" fill="hsl(50, var(--icon-sl))" />
                        <span>{{ utils.formatNumber(props.likes) }}赞</span>
                    </FlexCore>

                    <FlexCore direction="row" gap="8px">
                        <TagButton v-for="tag in props.tags" :text="tag" :key="tag" />
                    </FlexCore>
                </div>
            </FlexCore>
        </div>
    </Card>

</template>

<style scoped lang="scss">
.main-grid {
    display: grid;
    grid-template-rows: 55fr 45fr;
    grid-template-columns: 100%; // 明确列宽，以便后续的文字截断
    aspect-ratio: 1/0.9;
    min-height: 200px; // 防止过度压缩
}

.bg {
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        cursor: pointer;

        transition: scale 0.5s ease-in-out;
    }

    &:hover {
        img {
            scale: 1.2;
        }
    }
}

.cont {
    .timespan {
        display: block; // 消除莫名其妙的上边距
    }

    .title {
        cursor: pointer;
        transition: color 0.1s ease-in-out;

        &:hover {
            color: var(--primary-fore-color);
        }
    }

    .postmeta {
        .svg-view {
            margin-right: 2px;
        }

        span {
            margin-right: 4px;
        }
    }
}
</style>