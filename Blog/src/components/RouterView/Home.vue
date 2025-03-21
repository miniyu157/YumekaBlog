<script setup lang="ts">
import { ref, onMounted } from "vue";

import PostCard from "@/components/PostCard.vue";
import Card from "@/components/BaseCard.vue";
import NormalCard from "@/components/NormalCard.vue";
import StackPanel from "@/components/StackPanel.vue";

import PostsHeader from "@/components/PostsHeader.vue";

import UserView from "@/components/UserView.vue";
import SearchView from "@/components/SearchView.vue";
import SettingsView from "@/components/SettingsView.vue";


const postCount = ref(11);
const tagCount = ref(45);
const visitCount = ref(14);
const message = ref("欢迎来到 Yumeka!");

import { postApi, type Post } from "@/http/getPosts";

// 响应式数据
const posts = ref<Post[]>([]);

// 获取数据
const fetchPosts = async () => {
  try {
    // 请求参数：获取最新6篇（按创建时间倒序）
    const { data } = await postApi.getPosts({
      limit: 6,
      sort: '-createdAt' // 按最新排序
    });
    posts.value = data;
  } catch (error) {
    console.error('获取文章失败:', error);
    // 这里可以添加错误处理逻辑
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchPosts();
});

// const posts2 = ref<Post[]>([]);
// const tags = ref<string[]>(["new", "feature", "update", "old", "hot"]);

// const getRandomTags = () => {
//   const count = Math.random() < 0.5 ? 2 : 3;

//   const shuffled = [...tags.value];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }

//   return shuffled.slice(0, count);
// };

// const addNewPost = (posts: Post[], id: number) => {
//   posts.push({
//     id: id,
//     title: `This Post ${posts.length + 1}`,
//     heat: Math.floor(Math.random() * 1000),
//     comments: Math.floor(Math.random() * 500),
//     likes: Math.floor(Math.random() * 2000),
//     tags: getRandomTags(),
//     imageUrl: `/src/assets/images/post-images-thumbnails/${id}.jpg`,
//   });
// };

// for (let i = 0; i <= 5; i++) {
//   addNewPost(posts.value, i);
// }

// for (let i = 6; i <= 11; i++) {
//   addNewPost(posts2.value, i);
// }
</script>

<template>
  <div id="mainGrid">
    <!-- 左侧区域 -->
    <stack-panel>
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
    </stack-panel>

    <!-- 右侧区域 -->
    <stack-panel>
      <card class="messageCard" :flat="true">
        <stack-panel gap="10px" class="single-line message-panel" orientation="horizontal">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            role="img" viewBox="0 0 24 24"
            style="transform: rotate(0) translate(0px, 0px); width: 1.5em; height: 1.5em">
            <path fill="currentColor"
              d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2">
            </path>
          </svg>

          <p>{{ message }}</p>
        </stack-panel>
      </card>

      <posts-header title="Yumeka" />

      <hr />

      <div class="post-container">
        <post-card v-for="post in posts" :key="post._id" :title="post.title" :image-url="post.imageUrl"
          :heat="post.heat" :comments="post.comments" :likes="post.likes" :tags="post.tags" />
      </div>

      <posts-header title="Other" />

      <hr />

      <h3 class="subtitle">文章块 'Other' 暂未开放</h3>
      <!-- <div class="post-container">
        <post-card v-for="post in posts2" :key="post.id" :title="post.title" :heat="post.heat" :comments="post.comments"
          :likes="post.likes" :tags="post.tags" :image-url="post.imageUrl" />
      </div> -->

    </stack-panel>
  </div>
</template>

<style scoped>
.post-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  transition: all 1s ease;
}

#mainGrid {
  display: grid;
  grid-template-columns: minmax(0, 25fr) minmax(0, 75fr);
  gap: 16px;
}

@media (max-width: 1100px) {
  .post-container {
    grid-template-columns: repeat(2, 1fr);
  }

  #mainGrid {
    grid-template-columns: 31fr 69fr;
  }
}

@media only screen and (max-width: 767px) {
  .post-container {
    grid-template-columns: 1fr;
  }

  :deep(.post-card) {
    aspect-ratio: 1/0.3;

    .post-grid {
      grid-template-rows: none;
      grid-template-columns: 6.2fr 3.8fr;

      .post-item1 {
        order: 2;
      }

      .post-item2 {
        order: 1;
      }
    }
  }

  /* 手机屏幕信息栏改动 */
  /* :deep(.user-view) {
    flex-direction: row;
  } */

  #mainGrid {
    grid-template-columns: 1fr;
  }
}
</style>
