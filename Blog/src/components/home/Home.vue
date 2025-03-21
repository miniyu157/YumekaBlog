<script setup lang="ts">
import { ref, onMounted } from "vue";

import NormalCard from "@/components/base/NormalCard.vue";
import FlexCore from "@/components/FlexCore.vue";

import UserView from "@/components/UserView.vue";
import SearchView from "@/components/SearchView.vue";
import SettingsView from "@/components/SettingsView.vue";

import RouterViewPanel from "@/components/base/RouterViewPanel.vue";

const postCount = ref(11);
const tagCount = ref(45);
const visitCount = ref(14);

import { postApi, type Post } from "@/http/getPosts";

const posts = ref<Post[]>([]);

const fetchPosts = async () => {
  try {
    const { data } = await postApi.getPosts({
      limit: 6,
      sort: '-createdAt' // 按最新排序
    });
    posts.value = data;
  } catch (error) {
    console.error('获取文章失败:', error);
  }
};

onMounted(() => {
  fetchPosts();
});

</script>

<template>
  <div id="mainGrid">
    <!-- 左侧区域 -->
    <flex-core gap="16px">
      <user-view :post-count="postCount" :tag-count="tagCount" :visit-count="visitCount" />

      <search-view />

      <settings-view />

      <normal-card :collapsible="true" :initial-expanded="false" title="标签">
        <div style="display: flex;flex-wrap: wrap; gap: 6px;">
          <button class="tag-button">bug</button>
          <button class="tag-button">api</button>
          <button class="tag-button">framework</button>
          <button class="tag-button">cloud</button>
          <button class="tag-button">database</button>
          <button class="tag-button">security</button>
          <button class="tag-button">DevOps</button>
          <button class="tag-button">microservice</button>
          <button class="tag-button">javascript</button>
          <button class="tag-button">python</button>
          <button class="tag-button">health</button>
          <button class="tag-button">travel</button>
          <button class="tag-button">foodie</button>
          <button class="tag-button">fitness</button>
          <button class="tag-button">hobby</button>
          <button class="tag-button">parenting</button>
          <button class="tag-button">pets</button>
          <button class="tag-button">gardening</button>
          <button class="tag-button">cooking</button>
          <button class="tag-button">course</button>
          <button class="tag-button">book</button>
          <button class="tag-button">language</button>
          <button class="tag-button">coding</button>
          <button class="tag-button">exam</button>
          <button class="tag-button">thesis</button>
          <button class="tag-button">research</button>
          <button class="tag-button">assignment</button>
          <button class="tag-button">skill</button>
          <button class="tag-button">certificate</button>
        </div>
      </normal-card>

      <normal-card title="This a card">
        <p class="subtitle">Zelto mqru fiep gaxo ujik. Vrinb qsot xelp? Fkraw zsmo ytix.</p>
      </normal-card>

      <normal-card title="This a card">
        <p class="subtitle">这是一个卡片吗？哦！原来这是一个卡片。<br><br>V me 50 treat me to a KFC豪华套餐</p>
      </normal-card>
    </flex-core>

    <!-- 右侧区域 -->
    <RouterViewPanel />
  </div>
</template>

<style scoped>
#mainGrid {
  display: grid;
  grid-template-columns: minmax(0, 25fr) minmax(0, 75fr);
  gap: 16px;
}
</style>
