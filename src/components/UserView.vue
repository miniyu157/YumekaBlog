<script setup lang="ts">
import Card from '@/components/BaseCard.vue'
import StackPanel from '@/components/StackPanel.vue'

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
    <div class="user-view">
      <stack-panel class="part-1">
        <img class="headIcon" src="/src/assets/images/yumeka.jpg" />
        <h2 class="unline-height">Yumeka</h2>
      </stack-panel>

      <stack-panel class="part-2">
        <div class="dataSizeGrid">
          <span>文章</span>
          <span>分类</span>
          <span>访问量</span>
          <span>{{ postCount }}</span>
          <span>{{ tagCount }}</span>
          <span>{{ visitCount }}</span>
        </div>
        <button class="big-button">朋友圈</button>
      </stack-panel>
    </div>
  </card>
</template>

<style scoped>
.user-view {
  display: flex;
  flex-direction: column;

  gap: 16px;

  align-items: center;
  justify-items: center;
}

.part-1,
.part-2 {
  align-items: center;
}

button {
  width: 60%;
}

.headIcon {
  width: 60%;
  border-radius: 50%;

  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
}

.headIcon:hover {
  transform: rotate(360deg);
}

.dataSizeGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  column-gap: 16px;
  row-gap: 16px;

  align-items: center;
  justify-items: center;
}
</style>
