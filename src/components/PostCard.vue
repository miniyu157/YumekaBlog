<script setup lang="ts">

import StackPanel from '@/components/StackPanel.vue'
import Card from '@/components/BaseCard.vue'

interface Props {
  title: string
  heat: number
  comments: number
  likes: number
  tags: string[]
  imageUrl: string
}

const props = defineProps<Props>()

const formatNumber = (num: number) => num.toLocaleString()
</script>

<template>
  <card class="post-card">
    <div class="post-grid">
      <div class="post-item1">
        <img :src="imageUrl" :alt="props.title" />
      </div>

      <div class="post-item2">
        <stack-panel gap="6px" class="single-line" orientation="horizontal">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            role="img" viewBox="0 0 24 24"
            style="transform:rotate(180deg) translate(0px, 0px); width: 1.5em; height: 1.5em">
            <path fill="currentColor"
              d="M19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21M6 14h12v-2H6zm0 3h12v-1.5H6z">
            </path>
          </svg>
          <h3 class="unline-height">{{ title }}</h3>
        </stack-panel>

        <stack-panel gap="6px" class="item-2-2">
          <stack-panel orientation="horizontal" gap="4px" class="data subtitle">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24"
              style="transform:rotate(0) translate(0px, 0px); width: 1.5em; height: 1.5em">
              <path fill="currentColor"
                d="M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.6.6 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27">
              </path>
            </svg>
            <span>{{ formatNumber(heat) }} 热度</span>

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24"
              style="transform:rotate(0) translate(0px, 0px); width: 1.5em; height: 1.5em">
              <path fill="currentColor"
                d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2">
              </path>
            </svg>
            <span>{{ formatNumber(comments) }} 评论</span>

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24"
              style="transform:rotate(0) translate(0px, 0px); width: 1.5em; height: 1.5em">
              <path fill="currentColor"
                d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z">
              </path>
            </svg>
            <span>{{ formatNumber(likes) }} 赞</span>
          </stack-panel>

          <!-- 标签 -->
          <stack-panel gap="6px" class="tag-panel" orientation="horizontal">
            <button v-for="(tag, index) in tags" :key="index" class="tag-button">
              {{ tag }}
            </button>
          </stack-panel>

        </stack-panel>

      </div>
    </div>
  </card>
</template>

<style scoped>
span {
  font-size: 9pt;
}

.data {
  font-size: 10pt;
  align-items: center;
}

.tag-panel {
  align-items: center;
}

.post-card {
  aspect-ratio: 1/0.9;
  padding: 0;
  overflow: hidden;
}

.post-grid {
  display: grid;
  cursor: pointer;
  grid-template-rows: 55% 45%;

  height: 100%;
}

.post-item1 {
  overflow: hidden;
}

.post-item2 {
  margin: 4px 10px;
}

.item-2-2 {
  position: absolute;
  bottom: 10px;
}

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
</style>
