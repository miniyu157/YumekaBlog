<script setup lang="ts">
import { ref } from 'vue';
import NormalCard from './base/NormalCard.vue';

const inputText = ref();

const handleSearch = () => {
  alert(inputText.value);
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
