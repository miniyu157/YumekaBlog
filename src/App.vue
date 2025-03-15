<script setup lang="ts">
import { ref } from "vue";
import { cssVarManager } from "./cssVarManager";

import PostCard from "@/components/PostCard.vue";
import Card from "@/components/BaseCard.vue";
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
    // 随机生成 2 或 3
    const count = Math.random() < 0.5 ? 2 : 3;

    // 使用 Fisher-Yates 算法洗牌
    const shuffled = [...tags.value];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 取前 N 个标签
    return shuffled.slice(0, count);
  };

  posts.value.push({
    id: posts.value.length + 1,
    title: `This Post ${posts.value.length + 1}`,
    heat: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 500),
    likes: Math.floor(Math.random() * 2000),
    tags: getRandomTags(), // 使用随机标签
    imageUrl: `/src/assets/images/post-images-thumbnails/${posts.value.length}.jpg`,
  });
};

// 初始化文章数据
for (let i = 0; i <= 8; i++) {
  addNewPost();
}

const home = () => {
  alert("clicked home");
};
const blog = () => {
  alert("clicked blog");
};
const friend = () => {
  alert("clicked friend");
};
const about = () => {
  alert("clicked about");
};


// 直接使用封装好的方法
const toggleDebug = () => cssVarManager.isDebug = !cssVarManager.isDebug;

async function getImageUrl(): Promise<string> {
  try {
    //const response = await axios.get("http://192.168.125.21:3000/api/random-image");
    const response = await axios.get("http://localhost:3000/api/random-image");
    const url = response.data.imageUrl;
    // return `http://192.168.125.21:3000${url}`;
    return `http://localhost:3000${url}`;
  } catch (error) {
    return "/src/assets/images/yumeka.jpg";
  }
}


(async () => {
  const imageUrl = await getImageUrl();
  cssVarManager.bgUrl = imageUrl;
})();

const testButton = () => {
  document.getElementById("")
};
</script>

<template>

  <github-link />

  <div id="container">
    <stack-panel>

      <!-- header -->
      <h1 class="unline-height title">{{ title }}</h1>

      <nav id="main-nav">
        <stack-panel gap="12px" class="header-buttons" orientation="horizontal">
          <h3 @click="home" class="underline-from-center">首页</h3>
          <h3 @click="blog" class="underline-from-center">博客</h3>
          <h3 @click="friend" class="underline-from-center">友站</h3>
          <h3 @click="about" class="underline-from-center">关于</h3>
        </stack-panel>
      </nav>

      <stack-panel orientation="horizontal">
        <button @click="toggleDebug" class="flat-button">Debug</button>
        <button @click="testButton" class="flat-button">Test Button</button>
      </stack-panel>

      <div id="mainGrid">
        <!-- 左侧区域 -->
        <stack-panel>
          <!-- 信息窗口 -->
          <user-view :post-count="postCount" :tag-count="tagCount" :visit-count="visitCount"></user-view>

          <!-- 搜索 -->
          <card>
            <stack-panel gap="4px">
              <h3 class="subtitle unline-height">搜索</h3>
              <input type="text" placeholder="搜索文章" />
            </stack-panel>
          </card>

          <card>
            <stack-panel gap="4px">
              <h3 class="unline-height">This a card</h3>
              <p class="subtitle">Zelto mqru fiep gaxo ujik. Vrinb qsot xelp? Fkraw zsmo ytix.</p>
            </stack-panel>
          </card>

          <card>
            <stack-panel gap="4px">
              <h3 class="unline-height">This a card</h3>
              <p class="subtitle">这是一个卡片吗？哦！原来这是一个卡片。<br><br>V me 50 treat me to a KFC豪华套餐</p>
            </stack-panel>
          </card>

          <card>
            <stack-panel gap="4px">
              <h3 class="unline-height">This a card</h3>
              <p class="subtitle">这是一个卡片吗？哦！原来这是一个卡片。<br><br>V me 50 treat me to a KFC豪华套餐</p>
            </stack-panel>
          </card>
        </stack-panel>

        <!-- 右侧区域 -->
        <stack-panel>
          <!-- 公告栏 -->
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
            <post-card class="card" v-for="post in posts" :key="post.id" :title="post.title" :heat="post.heat"
              :comments="post.comments" :likes="post.likes" :tags="post.tags" :image-url="post.imageUrl" />
          </div>

        </stack-panel>
      </div>
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
  grid-template-columns: 25fr 75fr;
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
    grid-template-columns: repeat(1, 1fr);

    /* 此处把 PostCard 中的图像隐藏 */

    >.card {
      aspect-ratio: 1/0.5;
    }
  }

  #mainGrid {
    grid-template-columns: 100fr;
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
  top: 0;
  z-index: 999;
  height: calc(var(--header-height)/2);
  pointer-events: none;

  /* 使按钮的模糊宽度等于文档宽度 */
  width: 100vw;
  margin-left: calc(50% - 50vw);

  >.header-buttons {
    /*设置此属性auto后伪元素的hover生效，但不能穿透点击了 */
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

    backdrop-filter: blur(10px);

    mask: linear-gradient(to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.66) 66%,
        rgba(0, 0, 0, 0) 100%);

    transition: all 0.2s ease;
  }

  >.header-buttons:hover::before {
    backdrop-filter: blur(20px) brightness(120%);
    background-color: rgba(0, 0, 0, 0.4);
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
}
</style>
