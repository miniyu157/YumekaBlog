<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import Card from "@/components/common/BaseCard.vue";
import FlexCore from "@/components/common/FlexCore.vue";
import PostsHeader from "@/components/PostsHeader.vue";
import PostCard from "@/components/PostCard.vue";
import SvgView from "@/components/common/SvgView.vue";

const message = ref("欢迎来到 Yumeka!");

import { postsApi, type Post } from "@/http/getPosts";

const posts = ref<Post[]>([]);
const tip = ref("正在加载...");
const tipShow = computed(() => tip.value !== "");

const fetchPosts = async () => {
  try {
    const { data } = await postsApi.getPosts({
      limit: 6,
      sort: '-createdAt' // 按最新排序
    });
    posts.value = data;

    tip.value = posts.value.length == 0 ? "列表 'Yumeka' 暂无文章" : "";

  } catch (error) {
    tip.value = "获取文章失败";
  }
};

onMounted(() => {
  fetchPosts();
});

</script>
<template>
  <FlexCore gap="16px">
    <Card class="message-panel" :flat="true">
      <FlexCore vertical-alignment="center" gap="10px" class="message-panel" orientation="row">
        <SvgView name="comments" />

        <p>{{ message }}</p>
      </FlexCore>
    </Card>

    <PostsHeader title="Yumeka" router-link="/postlist" />
    <hr />
    <h3 v-show="tipShow" class="subtitle">{{ tip }}</h3>
    <div class="post-container">
      <PostCard v-for="post in posts" v-bind="post" />
    </div>

    <PostsHeader title="Other" router-link="/otherpostlist" />
    <hr />
    <h3 class="subtitle">列表 'Other' 暂未开放</h3>

  </FlexCore>
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
