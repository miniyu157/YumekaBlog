<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { defSettings } from "./cssVars/defSettings";
import { useSettings } from "./cssVars/useSettings";

import PostCard from "@/components/PostCard.vue";
import Card from "@/components/BaseCard.vue";
import NormalCard from "@/components/NormalCard.vue";
import StackPanel from "@/components/StackPanel.vue";
import GithubLink from "@/components/GithubLink.vue";
import UserView from "@/components/UserView.vue";
import TypeHeader from "@/components/TypeHeader.vue";

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
const tags = ref<string[]>(["new", "feature", "update", "old", "hot"]);

const addNewPost = () => {
  const getRandomTags = () => {
    const count = Math.random() < 0.5 ? 2 : 3;

    const shuffled = [...tags.value];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  };

  posts.value.push({
    id: posts.value.length + 1,
    title: `This Post ${posts.value.length + 1}`,
    heat: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 500),
    likes: Math.floor(Math.random() * 2000),
    tags: getRandomTags(),
    imageUrl: `/src/assets/images/post-images-thumbnails/${posts.value.length}.jpg`,
  });
};

for (let i = 0; i <= 5; i++) {
  addNewPost();
}

async function getImageUrl(): Promise<string> {
  try {
    const response = await axios.get("http://192.168.125.21:3000/api/random-image");
    // const response = await axios.get("http://localhost:3000/api/random-image");
    const url = response.data.imageUrl;
    return `http://192.168.125.21:3000${url}`;
    // return `http://localhost:3000${url}`;
  } catch (error) {
    return "/src/assets/images/yumeka.jpg";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const loadBgAsync = async () => {
  const body = document.querySelector("body");

  if (body) {
    /* 设置此项可屏蔽启动时 body 透明度 to 0 的动画 */
    body.style.visibility = 'collapse';
  }

  try {
    await sleep(500);
    const url = await getImageUrl();
    await defSettings.setBgUrlAsync(url);

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

</script>

<template>

  <github-link />

  <div id="container">
    <stack-panel>

      <!-- header -->
      <h1 class="unline-height title">{{ title }}</h1>

      <nav id="main-nav">
        <stack-panel gap="12px" class="header-buttons" orientation="horizontal">
          <h3 class="underline-from-center">首页</h3>
          <h3 class="underline-from-center">博客</h3>
          <h3 class="underline-from-center">友站</h3>
          <h3 class="underline-from-center">关于</h3>
        </stack-panel>
      </nav>

      <stack-panel orientation="horizontal">
        <button @click="defSettings.isDebug.value = !defSettings.isDebug.value;" class="flat-button">Debug</button>
        <button @click="testButton" class="flat-button">Test Button</button>
      </stack-panel>

      <div id="mainGrid">
        <!-- 左侧区域 -->
        <stack-panel>
          <user-view :post-count="postCount" :tag-count="tagCount" :visit-count="visitCount"></user-view>

          <normal-card title="搜索">
            <input style="min-width: auto;" type="text" placeholder="搜索文章" />
          </normal-card>

          <normal-card class="settings" :collapsible="true" :initial-expanded="false" title="设置">
            <stack-panel gap="12px">
              <p class="subtitle">外观</p>

              <div class="settings-grid">
                <p>卡片圆角 {{ useSettings.cardCorner.value }} px</p>
                <input type="range" min="0" max="60" v-model.number="useSettings.cardCorner.value">

                <p>卡片模糊 {{ useSettings.cardBlur.value }} px</p>
                <input type="range" min="0" max="80" v-model.number="useSettings.cardBlur.value">

                <p>卡片饱和度 {{ useSettings.cardSaturate.value }} %</p>
                <input type="range" min="0" max="200" v-model.number="useSettings.cardSaturate.value">

                <p>背景模糊 {{ blurValue }}%</p>
                <input type="range" min="0" max="100" v-model.number="blurValue">

                <p>背景饱和度 {{ blurValue }}%</p>
                <input type="range" min="0" max="100" v-model.number="blurValue">

                <p>背景亮度 {{ blurValue }}%</p>
                <input type="range" min="0" max="100" v-model.number="blurValue">
              </div>

              <stack-panel style="display: flex; justify-content: space-between;" orientation="horizontal">
                <p class="subtitle">使用预设</p>
                <select style="padding: 4px 8px;" class="tag-button">
                  <option>Default - 1</option>
                  <option>Default - 2</option>
                </select>
              </stack-panel>
            </stack-panel>
          </normal-card>

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
                role="img" viewBox="0 0 24 24" style="transform: rotate(0) translate(0px, 0px); height: 24px">
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
            <post-card v-for="post in posts" :key="post.id" :title="post.title" :heat="post.heat"
              :comments="post.comments" :likes="post.likes" :tags="post.tags" :image-url="post.imageUrl" />
          </div>

        </stack-panel>
      </div>
    </stack-panel>
  </div>

</template>

<style scoped>
.settings {
  p {
    margin: 0;
  }
}

.settings-grid {
  display: grid;
  grid-template-columns: minmax(0, 60fr) minmax(0, 40fr);
  margin-left: 0.2em;
  gap: 12px;

  input {
    padding: 0;
  }

  p {
    margin: 0;
    font-size: 11pt;
  }
}

#container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 90%;
  padding-bottom: var(--header-height);

  margin: 0 auto;

  --header-gap: 24px;
  --header-height: 45vh;

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

  #mainGrid {
    grid-template-columns: 1fr;
  }
}

.title {
  display: flex;

  cursor: default;
  font-family: "义启星空之翼", sans-serif;
  font-size: 45pt;
  min-width: 532px;
  height: calc(var(--header-height)/2);

  margin-bottom: var(--header-gap);

  justify-content: center;
  align-items: end;

  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

#main-nav {
  position: sticky;
  top: 0px;
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

    /* backdrop-filter: blur(10px); */

    mask: linear-gradient(to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.66) 40%,
        rgba(0, 0, 0, 0) 100%);

    transition: all 0.2s ease;
  }

  /*
  >.header-buttons:hover::before {
    backdrop-filter: blur(20px) brightness(120%);
    background-color: rgba(0, 0, 0, 0.4);
  } */
}

.header-buttons.sticky-active::before {
  backdrop-filter: blur(10px);
}

.header-buttons.sticky-active:hover::before {
  backdrop-filter: blur(20px) brightness(120%);
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
