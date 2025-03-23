<script setup lang="ts">
import { ref } from 'vue';

import FlexCore from '@/components/base/FlexCore.vue';
import Card from '@/components/base/BaseCard.vue';
import SvgView from '@/components/base/SvgView.vue';
import router from '@/router';

interface Props {
  title: string;
  imageUrl: string;
  content: string;

  heat: number;
  comments: number;
  likes: number;
  tags: string[];

  createdAt: string;

  displayMode?: "big" | "small";
  reverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  displayMode: "small",
  reverse: false,
});

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`.replace(/\.0k$/, 'k');
  }
  return num.toLocaleString();
};

const toggleTagFilter = (tag: string) => {
  router.push({
    path: "/posts",
    query: {
      page: 1,
      limit: 6,
      sort: "-heat",
      tags: [tag],
    }
  });
};

</script>

<template>
  <Card class="root" :class="[props.displayMode === 'big' ? 'big-mode' : 'small-mode']">
    <div class="post-grid">

      <div class="item-0" :class="{ 'reverse': props.reverse }">
        <img :src="imageUrl" :alt="props.title" />
      </div>

      <FlexCore class="item-1" vertical-alignment="space-between">

        <!-- 时间日期 -->
        <FlexCore class="data-time" vertical-alignment="center" orientation="row" gap="4px">
          <SvgView translate="0.25em, 0.25em" name="date" />
          <p>发布于 {{ createdAt }}</p>
        </FlexCore>

        <!-- 标题 -->
        <FlexCore vertical-alignment="center" gap="6px" orientation="row">
          <SvgView rotate="180deg" name="post" />
          <h3 class="post-title unline-height">{{ title }}</h3>
        </FlexCore>

        <!-- 信息栏 -->
        <FlexCore vertical-alignment="center" orientation="row" gap="4px" class="data subtitle">
          <SvgView name="heat" />
          <span>{{ formatNumber(heat) }} 热度</span>

          <SvgView name="comments" />
          <span>{{ formatNumber(comments) }} 评论</span>

          <SvgView name="likes" />
          <span>{{ formatNumber(likes) }} 赞</span>
        </FlexCore>

        <p v-show='props.displayMode == "big"' class="content">{{ content }}</p>

        <!-- 标签 -->
        <FlexCore gap="8px" orientation="row">
          <button @click="toggleTagFilter(tag);" v-for="(tag, index) in tags" :key="index" class="small-button">
            {{ tag }}
          </button>
        </FlexCore>

      </FlexCore>
    </div>
  </Card>
</template>

<style scoped>
.data-time {
  font-size: 0.8em;
  opacity: 75%;

  p {
    margin: 0;
  }
}

.content {
  height: 45%;
  margin: 0;
}

.root {
  aspect-ratio: 1/0.9;
  padding: 0;
  overflow: hidden;

  .post-grid {
    display: grid;
    cursor: pointer;
    grid-template-rows: 55fr 45fr;

    height: 100%;
  }
}

.root.big-mode {
  aspect-ratio: 1 / 0.35;

  .post-grid {
    display: grid;
    cursor: pointer;
    grid-template-rows: none;
    grid-template-columns: 1fr 1fr;
    height: 100%;

    .item-1 {
      padding: 8px;
    }
  }
}

.item-0.reverse {
  order: 1;
}

.item-1.reverse {
  order: 0;
}

.item-0 {
  overflow: hidden;

  img {
    scale: 1;
    transition: scale 0.5s ease-in-out;

    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img:hover {
    scale: 1.2;
  }
}

.item-1 {
  margin: 8px;

  .post-title {
    margin: 0;
  }

  .data {
    font-size: 10pt;
    align-items: center;

    span {
      font-size: 0.9em;
    }
  }
}
</style>
