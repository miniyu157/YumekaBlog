<script setup lang="ts">

import { ref } from 'vue'
import PostCard from '@/components/PostCard.vue'
import Card from '@/components/BaseCard.vue'
import StackPanel from '@/components/StackPanel.vue'

// 定义文章类型接口
interface Post {
  id: number
  title: string
  heat: number
  comments: number
  likes: number
  tags: string[]
  imageUrl: string
}

const postCount = ref(11)
const tagCount = ref(45)
const visitCount = ref(14)

// 初始化带类型的文章数组
const posts = ref<Post[]>([])

const tags = ref<string[]>(["new", "feature", "update", "old", "hot"]);

// 添加新文章的方法
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
    tags: getRandomTags(),  // 使用随机标签
    imageUrl: `/src/assets/images/contentImages/${posts.value.length}.jpg`
  });
}

// 初始化文章数据
for (let i = 0; i <= 8; i++) {
  addNewPost();
}
</script>

<template>
  <div class="container">
    <stack-panel class="single-line">
      <h1>Welcome</h1>
      <div class="mainGrid">

        <!-- 左侧区域 -->
        <stack-panel>

          <!-- 信息窗口 -->
          <card>
            <stack-panel class="userView">
              <img class="headIcon" src="/src/assets/images/yumeka.jpg" />
              <h2>Yumeka</h2>
              <div class="dataSizeGrid">
                <span>文章</span>
                <span>分类</span>
                <span>访问量</span>
                <span>{{ postCount }}</span>
                <span>{{ tagCount }}</span>
                <span>{{ visitCount }}</span>
              </div>
              <button class="big-button">朋友圈</button>
            </stack-panel>
          </card>

          <!-- 搜索 -->
          <Card>
            <stack-panel gap="4px">
              <h3 class="subtitle">搜索</h3>
              <input type="text" placeholder="搜索文章" />
            </stack-panel>
          </Card>
        </stack-panel>

        <!-- 右侧区域 -->
        <stack-panel>

          <!-- 公告栏 -->
          <card class="messageCard" :flat="true">
            <stack-panel gap="10px" class="single-line message-panel" orientation="horizontal">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" viewBox="0 0 24 24" style="transform:rotate(0) translate(0px, 0px); height: 24px">
                <path fill="currentColor"
                  d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2">
                </path>
              </svg>
              <p>欢迎来到 Yumeka!</p>
            </stack-panel>
          </card>

          <!--文章容器上方-->
          <stack-panel class="single-line" orientation="horizontal">
            <stack-panel gap="6px" class="subtitle single-line" orientation="horizontal">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" viewBox="0 0 24 24" style="transform:rotate(180deg) translate(0px, 0px); height: 24px;">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z">
                  </path>
                  <path fill="currentColor"
                    d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM9 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z">
                  </path>
                </g>
              </svg>
              <h3>Yumeka</h3>
            </stack-panel>

            <stack-panel style="width: auto;" class="subtitle link-block single-line" orientation="horizontal"
              gap="6px">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" viewBox="0 0 24 24" style="transform:rotate(180deg) translate(0px, 0px); height: 24px">
                <path fill="currentColor"
                  d="M9 20q-.475 0-.9-.213t-.7-.587l-4.5-6q-.4-.525-.4-1.2t.4-1.2l4.5-6q.275-.375.7-.587T9 4h11q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm1-7q.425 0 .713-.288T11 12t-.288-.712T10 11t-.712.288T9 12t.288.713T10 13m3.5 0q.425 0 .713-.288T14.5 12t-.288-.712T13.5 11t-.712.288T12.5 12t.288.713t.712.287m3.5 0q.425 0 .713-.288T18 12t-.288-.712T17 11t-.712.288T16 12t.288.713T17 13">
                </path>
              </svg>
              <h3>More</h3>
            </stack-panel>
          </stack-panel>

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

<style>
body {
  font-family: Helvetica, Tahoma, Arial, 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei';

  color: white;

  background-image: url('/src/assets/images/background.png');
  backdrop-filter: blur(30px) brightness(0.8);
  background-attachment: fixed;

  margin: 0;
  min-height: 100vh;
  position: relative;
}

.container {
  display: flex;
  flex-direction: column;

  max-width: 1200px;
  width: 90%;
  padding-top: 25vh;
  padding-bottom: 200px;

  margin: auto;
}

.mainGrid {
  display: grid;
  grid-template-columns: 25% 75%;
  gap: 16px;
}

h1 {
  font-family: 'CustomFont', sans-serif;
  font-size: 45pt;
  margin-bottom: 100px;
}

h2,
h3 {
  line-height: 0px;
}

::selection {
  background: rgba(255, 255, 255, 0.3);
}

/* 文章容器样式 */
.post-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  column-gap: 20px;
  row-gap: 20px;
}

.post-container .card {
  aspect-ratio: 1/0.9;
  padding: 0;
  overflow: hidden;
}

@font-face {
  font-family: "CustomFont";
  src: url("/src/assets/fonts/义启星空之翼.ttf");
}

.big-button {
  padding: 8px 24px;
  border-radius: 999px;
  border: 0px solid;
  outline: none;
}

.flat-button {
  border: 0px solid;
  border-radius: 4px;
  padding: 2px 16px;
  background-color: rgba(255, 255, 255, 30%);
  color: currentColor;

  transition: all 0.2s ease-in-out;
}

.flat-button:hover {
  background-color: rgba(255, 255, 255, 40%);
}

input {
  padding: 8px 16px;
  border-radius: 999px;
  border: 0px solid;
  outline: none;
}

hr {
  border: 1px dashed rgba(255, 255, 255, 0.8);
  width: 100%;
  opacity: 80%;
  margin-top: 0px;
}

.headIcon {
  width: 60%;
  border-radius: 50%;

  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
}

.headIcon:hover {
  transform: rotate(360deg);
}

.dataSizeGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  column-gap: 16px;
  row-gap: 16px;

  align-items: center;
  justify-items: center;
}

.userView {
  align-items: center;
  justify-items: center;
  margin: 6px;
}

.userView button {
  width: 60%;
}
</style>
