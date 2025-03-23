<script setup lang="ts">
import Card from '@/components/base/BaseCard.vue';
import FlexCore from '@/components/base/FlexCore.vue';
import SvgView from '@/components/base/SvgView.vue';
import PostCard from '@/components/PostCard.vue';

import { postApi, type Post } from "@/http/getPosts";
import { computed, onMounted, ref } from 'vue';

const props=defineProps({

});

const posts = ref<Post[]>([]);
const tip = ref("正在加载...");
const tipShow = computed(() => tip.value !== "");

const fetchPosts = async () => {
  try {
    const { data } = await postApi.getPosts({
      limit: 6,
      sort: '-heat',
      // tags:["AI"]
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

const obj = {
  _isReverse: true,
  get isReverse() {
    const current = this._isReverse;
    this._isReverse = !current;
    return current;
  }
};



</script>

<template>

  <FlexCore class="root" gap="16px">
    <!-- <FlexCore horizontal-alignment="space-between" orientation="row">
      <FlexCore vertical-alignment="center" gap="8px" orientation="row" class="subtitle">
        <SvgView name="grid"></SvgView>
        <h3>全部文章</h3>
      </FlexCore>
      <button class="flat-button">管理</button>
    </FlexCore> -->

    <!-- <hr> -->

    <div class="content-grid">

      <Card class="grid-item-1" :flat="true">
        <FlexCore>
          <h3>过滤选项</h3>
          <p>关键字:</p>
        </FlexCore>
      </Card>

      <FlexCore class="grid-item-2" gap="16px">
        <h3 v-show="tipShow" class="subtitle">{{ tip }}</h3>

        <div class="post-container">
          <PostCard :reverse="obj.isReverse" display-mode="big" v-for="post in posts" :key="post._id"
            :title="post.title" :image-url="post.imageUrl" :content="post.content" :heat="post.heat"
            :comments="post.comments" :likes="post.likes" :tags="post.tags" :created-at="post.createdAt" />
        </div>
      </FlexCore>

    </div>
  </FlexCore>

</template>

<style scoped lang="scss">
h3 {
  margin: 0;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width:1200px) {
  .content-grid {
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 16px;
  }

  .post-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .grid-item-1 {
    order: 2;
  }

  .grid-item-2 {
    order: 1;
  }
}
</style>
