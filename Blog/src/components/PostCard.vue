<script setup lang="ts">

import FlexCore from '@/components/base/FlexCore.vue'
import Card from '@/components/base/BaseCard.vue'
import SvgView from '@/components/base/SvgView.vue'

interface Props {
  title: string
  imageUrl: string

  heat: number
  comments: number
  likes: number
  tags: string[]
}

const props = defineProps<Props>()

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`.replace(/\.0k$/, 'k');
  }
  return num.toLocaleString();
};
</script>

<template>
  <card class="root">
    <div class="post-grid">

      <div class="item-0">
        <img :src="imageUrl" :alt="props.title" />
      </div>

      <flex-core class="item-1" vertical-alignment="space-between">

        <!-- 标题 -->
        <flex-core vertical-alignment="center" gap="6px" orientation="row">
          <svg-view :rotate="180" name="post" />
          <h3 class="post-title unline-height">{{ title }}</h3>
        </flex-core>

        <!-- 信息 -->
        <flex-core gap="4px">

          <flex-core orientation="row" gap="4px" class="data subtitle">
            <svg-view name="heat" />
            <span>{{ formatNumber(heat) }} 热度</span>

            <svg-view name="comments" />
            <span>{{ formatNumber(comments) }} 评论</span>

            <svg-view name="likes" />
            <span>{{ formatNumber(likes) }} 赞</span>
          </flex-core>

          <!-- 标签 -->
          <flex-core gap="8px" orientation="row">
            <button v-for="(tag, index) in tags" :key="index" class="small-button">
              {{ tag }}
            </button>
          </flex-core>

        </flex-core>

      </flex-core>
    </div>
  </card>
</template>

<style scoped>
.root {
  aspect-ratio: 1/0.9;
  padding: 0;
  overflow: hidden;
}

.post-grid {
  display: grid;
  cursor: pointer;
  grid-template-rows: 55fr 45fr;

  height: 100%;
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
