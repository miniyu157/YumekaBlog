<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'; // 导入 watch
import { useRoute, useRouter } from 'vue-router';
import { postApi } from '@/http/getPost';
import type { Post } from '@/http/getPosts';
import BaseCard from '../common/BaseCard.vue';
import FlexCore from '../common/FlexCore.vue';
// 假设 Post 接口也从 getPost.ts 导出，或者从单独的 types 文件导入
// import type { Post } from '@/http/getPost';

// --- Reactive State ---
const post = ref<Post | null>(null);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

// --- Router ---
const route = useRoute();
const router = useRouter();

// --- Computed Properties ---
// 从 URL 查询参数 (?id=...) 中获取帖子 ID
// **修改点：从 route.query.id 获取**
const postId = computed(() => {
  const idQuery = route.query.id; // 读取查询参数 'id'
  // 查询参数也可能是一个数组，取第一个元素；确保是字符串
  return Array.isArray(idQuery) ? idQuery[0] : idQuery;
});

// --- Data Fetching ---
/**
 * 异步函数：根据 postId 获取帖子数据
 */
const fetchPost = async () => {
  isLoading.value = true;
  error.value = null;
  post.value = null;

  const currentPostId = postId.value; // 获取当前的 postId 值

  // 检查 postId 是否有效 (字符串且非空)
  if (!currentPostId || typeof currentPostId !== 'string') {
    error.value = "无效或缺失的帖子 ID。请检查 URL 是否包含 '?id=...' 参数。";
    isLoading.value = false;
    console.error("Post ID is missing or invalid from route query:", route.query.id);
    return;
  }

  try {
    console.log(`尝试获取 ID 为 ${currentPostId} 的帖子...`); // 添加日志
    const fetchedPost = await postApi.getPostById(currentPostId);

    if (fetchedPost) {
      post.value = fetchedPost;
      console.log(`成功获取帖子: ${fetchedPost.title}`); // 添加日志
    } else {
      error.value = `ID 为 "${currentPostId}" 的帖子未找到。`;
      console.warn(`未找到 ID 为 ${currentPostId} 的帖子。`); // 添加日志
    }
  } catch (err: any) {
    console.error(`获取帖子 ${currentPostId} 时出错:`, err);
    error.value = err.message || "加载帖子失败，请稍后重试。";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});

watch(
  () => route.query.id, // 监听 id 查询参数
  (newId, oldId) => {
    if (newId !== oldId && route.name === 'PostView') { // 确保在当前路由且 ID 变化时执行
      console.log(`路由 ID 从 ${oldId} 变为 ${newId}，重新获取帖子...`);
      fetchPost(); // 重新调用 fetchPost
    }
  }
);

const toggleTagFilter = (tag: string) => {
  router.push({
    path: "/postlist",
    query: {
      page: 1,
      limit: 6,
      sort: "-heat",
      tags: [tag],
    }
  });
};

function formatDate(isoString: string) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

</script>

<template>
  <BaseCard class="root">
    <div v-if="isLoading" class="loading-indicator">
      <p>正在加载帖子...</p>
    </div>

    <article v-else-if="post" class="post-content">

      <div class="post-image-container">
        <img :src="post.imageUrl" :alt="`[图片：${post.title}]`" class="post-image"
          @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=Image+Not+Found'" />

        <div class="post-meta">
          <h1 class="meta-title">{{ post.title }}</h1>

          <FlexCore orientation="row" gap="16px" class="meta-detail">
            <span>发布于: {{ formatDate(post.createdAt) }}</span>
            <FlexCore orientation="row" gap="8px">
              <span>热度: {{ post.heat }}</span>
              <span>点赞: {{ post.likes }}</span>
              <span>评论: {{ post.comments }}</span>
            </FlexCore>
          </FlexCore>

        </div>
      </div>

      <FlexCore gap="8px" class="post-content-container">
        <div class="post-body" v-html="post.content"></div>

        <div v-if="post.tags && post.tags.length > 0" class="post-tags">
          <strong>标签:</strong>
          <span @click="toggleTagFilter(tag);" v-for="tag in post.tags" :key="tag" class="small-button">{{ tag }}</span>
        </div>
      </FlexCore>


    </article>

  </BaseCard>
</template>

<style scoped lang="scss">
.root {
  padding: 0;
  overflow: hidden;
}

.post-content-container {
  padding: 16px;
}

.post-tags {
  display: flex;
  gap: 8px;
}

.post-image-container {
  position: relative;

  &:hover {
    .meta-detail {
      opacity: 1;
    }
  }
}

.meta-detail {
  opacity: 0;
  transition: all 0.2s ease;
}

.post-image {
  width: 100%;
  aspect-ratio: 1/0.4;
  object-fit: cover;
  display: block; // 消除图片底部间隙
}

.meta-title {
  font-size: 48pt;
  margin: 0;
}



.post-meta {
  position: absolute;
  margin: 0;
  padding: 12px;
  bottom: 0;
}
</style>
