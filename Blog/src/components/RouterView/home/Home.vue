<script setup lang="ts">
import { ref, onMounted } from "vue";

import NormalCard from "@/components/base/NormalCard.vue";
import FlexCore from "@/components/base/FlexCore.vue";

import UserView from "@/components/UserView.vue";
import SearchView from "@/components/SearchView.vue";
import SettingsView from "@/components/SettingsView.vue";

import RouterViewPanel from "@/components/base/RouterViewPanel.vue";

const postCount = ref(11);
const tagCount = ref(45);
const visitCount = ref(14);

import { postApi, type Post } from "@/http/getPosts";
import TagBox from "@/components/TagBox.vue";

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

      <tag-box />

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

@media (max-width: 1200px) {
  #mainGrid {
    grid-template-columns: minmax(0, 28fr) minmax(0, 72fr);
  }
}
</style>
