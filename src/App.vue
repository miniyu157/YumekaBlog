<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { defSettings } from "./cssVars/defSettings";

import PostCard from "@/components/PostCard.vue";
import Card from "@/components/BaseCard.vue";
import NormalCard from "@/components/NormalCard.vue";
import StackPanel from "@/components/StackPanel.vue";
import GithubLink from "@/components/GithubLink.vue";
import UserView from "@/components/UserView.vue";
import TypeHeader from "@/components/TypeHeader.vue";
import SettingsView from "@/components/SettingsView.vue";

import axios from "axios";

// 定义文章类型接口
interface Post {
  id: number;
  title: string;
  heat: number;
  comments: number;
  likes: number;
  tags: string[];
  imageUrl: string;
}

const postCount = ref(11);
const tagCount = ref(45);
const visitCount = ref(14);
const message = ref("欢迎来到 Yumeka!");
const title = ref("Welcome to Yumeka");

const posts = ref<Post[]>([]);
const posts2 = ref<Post[]>([]);
const tags = ref<string[]>(["new", "feature", "update", "old", "hot"]);

const getRandomTags = () => {
  const count = Math.random() < 0.5 ? 2 : 3;

  const shuffled = [...tags.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

const addNewPost = (posts: Post[], id: number) => {
  posts.push({
    id: id,
    title: `This Post ${posts.length + 1}`,
    heat: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 500),
    likes: Math.floor(Math.random() * 2000),
    tags: getRandomTags(),
    imageUrl: `/src/assets/images/post-images-thumbnails/${id}.jpg`,
  });
};

for (let i = 0; i <= 5; i++) {
  addNewPost(posts.value, i);
}

for (let i = 6; i <= 11; i++) {
  addNewPost(posts2.value, i);
}

async function getImageUrl(): Promise<string> {
  try {
    // const response = await axios.get("http://192.168.125.21:3000/api/random-image");
    const response = await axios.get("http://192.168.1.16:3000/api/random-image");
    const url = response.data.imageUrl;
    // return `http://192.168.125.21:3000${url}`;
    return `http://192.168.1.16:3000${url}`;
  } catch (error) {
    return "/src/assets/images/yumeka.jpg";
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const loadBgAsync = async () => {
  const body = document.querySelector("body");

  if (body) {
    /* 设置此项可屏蔽启动时 body 透明度 to 0 的动画 */
    body.style.visibility = 'collapse';
  }

  try {
    const url = await getImageUrl();
    await defSettings.setBgUrlAsync(url);
    await delay(500);

  } catch (error) {
    console.error('Failed to load image:', error);

  } finally {
    const body = document.querySelector("body");

    if (body) {
      body.style.visibility = 'visible';
      body.style.opacity = '100%';
    }
  }
};

onMounted(loadBgAsync);

const isNavBlur = ref(false);
const scrollHandle = () => {
  isNavBlur.value = window.scrollY > 400;
}
onMounted(() => {
  window.addEventListener("scroll", scrollHandle);
})
onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandle);
})
</script>

<template>

  <github-link />

  <div id="container">
    <stack-panel>

      <!-- header -->
      <h1 class="unline-height title">{{ title }}</h1>

      <nav id="main-nav">
        <stack-panel gap="12px" class="header-buttons" :class="{ 'nav-blur': isNavBlur }" orientation="horizontal">
          <h3 class="underline-from-center">首页</h3>
          <h3 class="underline-from-center">博客</h3>
          <h3 class="underline-from-center">友站</h3>
          <h3 class="underline-from-center">关于</h3>
        </stack-panel>
      </nav>

      <!-- <stack-panel orientation="horizontal">
        <button @click="defSettings.isDebug.value = !defSettings.isDebug.value;" class="flat-button">Debug</button>
        <button @click="testButton" class="flat-button">Test Button</button>
      </stack-panel> -->

      <div id="mainGrid">
        <!-- 左侧区域 -->
        <stack-panel>
          <user-view :post-count="postCount" :tag-count="tagCount" :visit-count="visitCount" />

          <normal-card title="搜索">
            <input style="min-width: auto;" type="text" placeholder="搜索文章" />
          </normal-card>

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

          <type-header title="Yumeka" />

          <hr />

          <div class="post-container">
            <post-card v-for="post in posts" :key="post.id" :title="post.title" :heat="post.heat"
              :comments="post.comments" :likes="post.likes" :tags="post.tags" :image-url="post.imageUrl" />
          </div>

          <type-header title="Other" />

          <hr />

          <div class="post-container">
            <post-card v-for="post in posts2" :key="post.id" :title="post.title" :heat="post.heat"
              :comments="post.comments" :likes="post.likes" :tags="post.tags" :image-url="post.imageUrl" />
          </div>

        </stack-panel>
      </div>
    </stack-panel>
  </div>

</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 90%;
  padding-bottom: var(--header-height);

  margin: 0 auto;

  --header-gap: 24px;
  --header-height: 50vh;

  transition: all 1s ease;
}

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

  :deep(.user-view) {
    flex-direction: row;
  }

  #mainGrid {
    grid-template-columns: 1fr;
  }
}

.title {
  display: flex;

  cursor: default;
  font-family: "义启星空之翼", sans-serif;
  font-size: 50pt;
  min-width: 532px;
  height: calc(var(--header-height)/2);

  margin-bottom: var(--header-gap);

  justify-content: center;
  align-items: end;

  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

#main-nav {
  position: sticky;
  top: -1px;
  z-index: 999;
  height: calc(var(--header-height)/2);
  pointer-events: none;

  /* 使按钮的模糊宽度等于文档宽度 */
  width: 100vw;
  margin-left: calc(50% - 50vw);

  >.header-buttons {
    /*设置此属性auto后伪元素的hover生效，但不能穿透点击了，暂时搁置 */
    pointer-events: auto;

    justify-content: center;
    padding: 8px;

    >h3 {
      cursor: pointer;
      opacity: 85%;
      margin: 0;

      pointer-events: auto;
    }
  }

  >.header-buttons::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    width: 100%;

    mask: linear-gradient(to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.66) 40%,
        rgba(0, 0, 0, 0) 100%);

    transition: all 0.1s ease;
  }
}

/* 高亮导航栏 */
.header-buttons.nav-blur::before {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.3);
}

.header-buttons.nav-blur:hover::before {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
