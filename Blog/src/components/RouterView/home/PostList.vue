<script setup lang="ts">
import Card from '@/components/base/BaseCard.vue';
import FlexCore from '@/components/base/FlexCore.vue';
import SvgView from '@/components/base/SvgView.vue';
import PostCard from '@/components/PostCard.vue';

import { postApi, type GetPostsParams, type Pagination, type Post, type PostApiResponse } from "@/http/getPosts";
import { tagsApi } from '@/http/getTags';

import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 文章列表数据
const tip = ref("正在加载...");
const tipShow = computed(() => tip.value !== "");

// 加载失败时会使用以下值
const postApiResponse = ref<PostApiResponse>(
  {
    data: [],
    pagination: {
      page: 1,       // 当前页码
      limit: 6,      // 每页条数
      total: 0,      // 总数据量
      totalPages: 0  // 总页数
    }
  }
);
const posts = computed(() => postApiResponse.value?.data);
const pagination = computed(() => postApiResponse.value?.pagination);
const searchKeyword = ref("");

// 转换路由参数类型
const getPostsParams = () => ({
  page: Number(route.query.page) || 1,
  limit: Math.min(Number(route.query.limit) || 6, 100),
  sort: route.query.sort?.toString() || '-heat',
  tags: route.query.tags?.toString().split(',') || [],
  search: route.query.search?.toString()
});

const fetchPosts = async () => {
  try {
    tip.value = "正在加载...";

    const params = route.query; // 请求参数为当前页面参数
    const postResponse = await postApi.getPosts(params);

    postApiResponse.value = postResponse;

    tip.value = posts.value?.length === 0 ? "暂无相关文章" : "";
  } catch (error) {
    tip.value = "获取文章失败";
  }
};

// 监听路由参数变化自动刷新
watchEffect(() => {
  fetchPosts();
});

// 页码改变处理
const handlePageChange = (newPage: number) => {
  updateQueryParams({ page: newPage });
};

// 搜索处理
const handleSearch = () => {
  updateQueryParams({
    search: searchKeyword.value || undefined,
    page: 1 // 搜索时重置到第一页
  });
};

// 切换标签
const toggleTagFilter = (tag: string) => {
  const currentTags = getPostsParams().tags;
  const newTags = currentTags.includes(tag)
    ? currentTags.filter(t => t !== tag)
    : [...currentTags, tag];

  updateQueryParams({
    tags: newTags.length > 0 ? newTags : undefined,
    page: 1
  });
};

const tags = ref<string[]>([]);
const tagTip = ref("");
const tagTipShow = computed(() => tip.value !== "");

const getTags = async () => {
  try {
    const tagsResponse = await tagsApi.getTags();
    tags.value = tagsResponse.tags;

    tagTip.value = tags.value.length == 0 ? "暂无标签" : "";
  } catch (error) {
    tagTip.value = "获取标签列表失败";
  }
};

// 新增：获取当前排序状态
const getCurrentSort = () => {
  const sort = route.query.sort?.toString() || '-heat';
  const isDesc = sort.startsWith('-');
  const field = isDesc ? sort.substring(1) : sort;
  return { field, isDesc };
};

// 新增：排序处理函数
// 设置排序字段
const setSortField = (field: string) => {
  const { isDesc } = getCurrentSort();
  const newSort = isDesc ? `-${field}` : field;
  updateQueryParams({
    sort: newSort,
    page: 1 // 切换排序时回到第一页
  });
};

// 设置升序
const setSortAsc = () => {
  const { field } = getCurrentSort();
  updateQueryParams({
    sort: field,
    page: 1
  });
};

// 设置降序
const setSortDesc = () => {
  const { field } = getCurrentSort();
  updateQueryParams({
    sort: `-${field}`,
    page: 1
  });
};

// 更新URL参数
const updateQueryParams = (newParams: Record<string, any>) => {
  router.push({
    query: {
      ...route.query,
      ...newParams
    }
  });
};

// 初始化加载
onMounted(() => {
  if (!Object.keys(route.query).length) {
    updateQueryParams({
      page: 1,
      limit: 6,
      sort: '-heat'
    });
  }

  searchKeyword.value = route.query.search?.toString() || "";
});

onMounted(getTags);

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
    <div class="content-grid">
      <Card class="grid-item-1">
        <FlexCore gap="12px">
          <!-- 搜索框 -->
          <FlexCore orientation="row" gap="8px">
            <input v-model="searchKeyword" type="text" placeholder="输入关键词搜索" @keyup.enter="handleSearch"
              class="normal-input">
            <button class="normal-flat-button" @click="handleSearch">搜索</button>
          </FlexCore>

          <!-- 标签 -->
          <div class="option-container">
            <p>按标签过滤</p>
            <div class="tag-panel">
              <button @click="toggleTagFilter(tag)" :class="{ active: getPostsParams().tags.includes(tag) }"
                class="normal-flat-button filter-button" v-for="tag in tags">{{ tag }}</button>
              <FlexCore gap="16px" v-show="tagTipShow">
                <FlexCore vertical-alignment="center" gap="4px" orientation="row">
                  <SvgView size="1em" name="error" />
                  <p>{{ tagTip }}</p>
                </FlexCore>
              </FlexCore>
            </div>
          </div>

          <!-- 排序 -->
          <div class="option-container">
            <p>排序方式</p>
            <FlexCore gap="8px" orientation="row">
              <button @click="setSortField('heat')" :class="{ active: getCurrentSort().field === 'heat' }"
                class="filter-button normal-flat-button">
                <FlexCore gap="4px" orientation="row">
                  <SvgView name="heat"></SvgView>
                  <p>热度</p>
                </FlexCore>
              </button>
              <button @click="setSortField('comments')" :class="{ active: getCurrentSort().field === 'comments' }"
                class="filter-button normal-flat-button">
                <FlexCore gap="4px" orientation="row">
                  <SvgView name="comments"></SvgView>
                  <p>评论</p>
                </FlexCore>
              </button>
              <button @click="setSortField('likes')" :class="{ active: getCurrentSort().field === 'likes' }"
                class="filter-button normal-flat-button">
                <FlexCore gap="4px" orientation="row">
                  <SvgView name="likes"></SvgView>
                  <p>点赞</p>
                </FlexCore>
              </button>

              <div style="margin: 4px 0; width: 1px;background-color: currentColor;"></div>

              <button @click="setSortAsc" :class="{ active: !getCurrentSort().isDesc }"
                class="filter-button normal-flat-button">
                <FlexCore gap="4px" orientation="row">
                  <SvgView name="normal-order"></SvgView>
                  <p>升序</p>
                </FlexCore>
              </button>
              <button @click="setSortDesc" :class="{ active: getCurrentSort().isDesc }"
                class="filter-button normal-flat-button">
                <FlexCore gap="4px" orientation="row">
                  <SvgView name="reverse-order"></SvgView>
                  <p>降序</p>
                </FlexCore>
              </button>
            </FlexCore>
          </div>

          <hr v-if="pagination.totalPages > 1">

          <!-- 分页按钮 -->
          <div class="pagination" v-if="pagination?.totalPages > 1">
            <button class="normal-flat-button toggle-button" v-for="page in pagination.totalPages" :key="page"
              :class="{ active: page === pagination.page }" @click="handlePageChange(page)">
              {{ page }}
            </button>
          </div>
        </FlexCore>
      </Card>


      <FlexCore class="grid-item-2" gap="16px">
        <Card v-show="tipShow" :flat="true">
          <h3 class="tip-text subtitle">{{ tip }}</h3>
        </Card>

        <div class="post-container">
          <PostCard v-for="post in posts" :key="post._id" :reverse="obj.isReverse" display-mode="big" v-bind="post" />
        </div>
      </FlexCore>

    </div>

    <!-- 分页信息 -->
    <div class="tip-text">
      <span>
        第 {{ pagination?.page }} 页 / 共 {{ pagination?.totalPages }} 页
        ({{ pagination?.total }} 篇)
      </span>
    </div>
  </FlexCore>
</template>

<style scoped>
h3,
p {
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

.option-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.tag-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}


.toggle-button {
  border: 1px solid white;
  cursor: pointer;

  &.active {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(30, 30, 30, 1);
    transition: none;
  }
}


.filter-button {
  border: 1px dashed white;
  cursor: pointer;

  &.active {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(30, 30, 30, 1);
    transition: none;
  }
}

.pagination {
  display: flex;
  gap: 8px;
}

.tip-text {
  text-align: center;
}

@media (max-width: 1200px) {
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

  .option-container {
    flex-direction: column;
  }

  .grid-item-1 {
    order: 2;
  }

  .grid-item-2 {
    order: 1;
  }
}
</style>
