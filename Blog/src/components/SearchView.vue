<script setup lang="ts">
import { ref } from 'vue';
import NormalCard from '@/components/common/NormalCard.vue';
import router from '@/router';

const inputText = ref();

const toggleSearchFilter = (search: string) => {
  router.push({
    path: "/posts",
    query: {
      page: 1,
      limit: 6,
      sort: "-heat",
      search: [search],
    }
  });
};

const handleSearch = () => {
  toggleSearchFilter(inputText.value);
};

</script>

<template>
  <NormalCard title="搜索">
    <input v-model="inputText" class="normal-input" type="text" @keyup.enter="handleSearch" placeholder="搜索文章" />
  </NormalCard>
</template>

<style scoped>
input {
  box-sizing: border-box;
  width: 100%;
}
</style>
