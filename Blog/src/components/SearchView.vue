<script setup lang="ts">
import { ref } from 'vue';
import NormalCard from './base/NormalCard.vue';

const inputText = ref();

const handleSearch = () => {
  alert(inputText.value);
};

</script>

<template>
  <normal-card title="搜索">
    <input v-model="inputText" type="text" @keyup.enter="handleSearch" placeholder="搜索文章" />
  </normal-card>
</template>

<style scoped>
input {
  box-sizing: border-box;
  width: 100%;
}
</style>
