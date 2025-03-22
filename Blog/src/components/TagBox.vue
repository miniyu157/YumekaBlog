<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NormalCard from '@/components/base/NormalCard.vue';

const tags = ref<string[]>([]);

// const generateRandomTag = (): string => {
//   //字母库
//   const letters = 'abcdefghijklmnopqrstuvwxyz';

//   // 随机生成长度（4/5/6/7）
//   const length = 4 + Math.floor(Math.random() * 4);

//   // 生成随机字母组合
//   let tag = '';
//   for (let i = 0; i < length; i++) {
//     tag += letters[Math.floor(Math.random() * letters.length)];
//   }

//   return tag;
// };

// onMounted(() => {
//   for (let i = 1; i <= 30; i++) {
//     tags.value.push(generateRandomTag());
//   }
// })
</script>

<template>
  <NormalCard :collapsible="true" :initial-expanded="false" title="标签">
    <div style="display: flex;flex-wrap: wrap; gap: 6px;">

      <button class="small-button" v-for="tag in tags">{{ tag }}</button>

    </div>
  </NormalCard>
</template>
