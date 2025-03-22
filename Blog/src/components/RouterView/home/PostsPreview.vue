<script setup lang="ts">
import { ref, onMounted } from "vue";

import Card from "@/components/base/BaseCard.vue";
import FlexCore from "@/components/FlexCore.vue";
import PostsHeader from "@/components/PostsHeader.vue";
import PostCard from "@/components/PostCard.vue";

const message = ref("欢迎来到 Yumeka!");

import { postApi, type Post } from "@/http/getPosts";

const posts = ref<Post[]>([]);
const otherPosts = ref<Post[]>([]);

const fetchPosts = async () => {
  try {
    const { data } = await postApi.getPosts({
      limit: 6,
      sort: '-createdAt' // 按最新排序
    });
    posts.value = data;

    emptyTipShow.value = posts.value.length == 0;
  } catch (error) {
    console.error('获取文章失败:', error);
  }
};

onMounted(async () => {
  fetchPosts();
});

const emptyTipShow = ref(false);
</script>
<template>
  <flex-core gap="16px">
    <card class="message-panel" :flat="true">
      <flex-core vertical-alignment="center" gap="10px" class="message-panel" orientation="row">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
          viewBox="0 0 24 24" style="transform: rotate(0) translate(0px, 0px); width: 1.5em; height: 1.5em">
          <path fill="currentColor"
            d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2">
          </path>
        </svg>

        <p>{{ message }}</p>
      </flex-core>
    </card>

    <posts-header title="Yumeka" />

    <hr />

    <h3 v-show="emptyTipShow" class="subtitle">列表 'Yumeka' 暂无文章</h3>

    <div class="post-container">
      <post-card v-for="post in posts" :key="post._id" :title="post.title" :image-url="post.imageUrl" :heat="post.heat"
        :comments="post.comments" :likes="post.likes" :tags="post.tags" />
    </div>

    <posts-header title="Other" />

    <hr />

    <h3 class="subtitle">列表 'Other' 暂无文章</h3>

    <div class="post-container">
      <post-card v-for="post in otherPosts" :key="post._id" :title="post.title" :image-url="post.imageUrl"
        :heat="post.heat" :comments="post.comments" :likes="post.likes" :tags="post.tags" />
    </div>
  </flex-core>
</template>

<style scoped>
.message-panel {
  padding: 4px 8px;
}

.post-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  transition: all 1s ease;
}

@media (max-width: 1100px) {
  .post-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
