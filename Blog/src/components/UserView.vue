<script setup lang="ts">
import Card from "@/components/base/BaseCard.vue";
import StackPanel from "@/components/StackPanel.vue";

import router from "@/router/index.ts";

defineProps({
  postCount: {
    type: Number,
    default: 0
  },
  tagCount: {
    type: Number,
    default: 0
  },
  visitCount: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <card>
    <stack-panel class="root" gap="16px">
      <stack-panel class="part-1">
        <img class="head-icon" src="/src/assets/images/yumeka.jpg" />
        <h2 class="unline-height">Yumeka</h2>
      </stack-panel>

      <stack-panel class="part-2">
        <div class="data-grid">
          <span>文章</span>
          <span>分类</span>
          <span>访问量</span>
          <span>{{ postCount }}</span>
          <span>{{ tagCount }}</span>
          <span>{{ visitCount }}</span>
        </div>

        <button @click="router.push('/home/posts');" class="flat-button friend-circle-button">全部文章</button>

      </stack-panel>
    </stack-panel>
  </card>
</template>

<style scoped>
.friend-circle-button {
  width: 60%;
  padding: 6px 12px;
}

.part-1,
.part-2 {
  align-items: center;
}

.head-icon {
  width: 60%;
  border-radius: 50%;

  transition: transform 0.3s ease;
}

.head-icon:hover {
  transform: rotate(360deg);
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  gap: 16px;

  align-items: center;
  justify-items: center;
}
</style>
