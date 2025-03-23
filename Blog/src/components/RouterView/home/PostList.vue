<script setup lang="ts">
import Card from '@/components/base/BaseCard.vue';
import FlexCore from '@/components/base/FlexCore.vue';
import PostCard from '@/components/PostCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { postApi, type Post } from "@/http/getPosts";
import { computed, onMounted, ref, watchEffect } from 'vue';
import { tagsApi } from '@/http/getTags';

const route = useRoute();
const router = useRouter();

// 文章列表数据
const posts = ref<Post[]>([]);
const tip = ref("正在加载...");
const tipShow = computed(() => tip.value !== "");


// 分页信息
const pagination = ref({
  page: 1,
  limit: 6,
  total: 0,
  totalPages: 1
});

// 转换路由参数类型
const parseRouteParams = () => ({
  page: Number(route.query.page) || 1,
  limit: Math.min(Number(route.query.limit) || 6, 100),
  sort: route.query.sort?.toString() || '-heat',
  tags: route.query.tags?.toString().split(',') || [],
  search: route.query.search?.toString()
});

// 获取文章列表
const fetchPosts = async () => {
  try {
    tip.value = "正在加载...";

    const params = parseRouteParams();
    const { data, pagination: resPagination } = await postApi.getPosts(params);

    posts.value = data;
    pagination.value = resPagination;

    tip.value = posts.value.length === 0 ? "暂无相关文章" : "";
  } catch (error) {
    tip.value = "获取文章失败";
  }
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

// 页码改变处理
const handlePageChange = (newPage: number) => {
  updateQueryParams({ page: newPage });
};

// 搜索处理
const searchKeyword = ref("");
const handleSearch = () => {
  updateQueryParams({
    search: searchKeyword.value || undefined,
    page: 1 // 搜索时重置到第一页
  });
};

const toggleTagFilter = (tag: string) => {
  const currentTags = parseRouteParams().tags;
  const newTags = currentTags.includes(tag)
    ? currentTags.filter(t => t !== tag)
    : [...currentTags, tag];

  updateQueryParams({
    tags: newTags.length > 0 ? newTags : undefined,
    page: 1 // 过滤时重置到第一页
  });
};

// 监听路由参数变化自动刷新
watchEffect(() => {
  fetchPosts();
});

// 初始化加载
onMounted(() => {
  // 同步初始参数到URL
  if (!Object.keys(route.query).length) {
    updateQueryParams({
      page: 1,
      limit: 6,
      sort: '-heat'
    });
  }

  searchKeyword.value = route.query.search?.toString() || "";
});

const obj = {
  _isReverse: true,
  get isReverse() {
    const current = this._isReverse;
    this._isReverse = !current;
    return current;
  }
};

const tags = ref<string[]>([]);

const tagTip = ref("正在加载...");
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

onMounted(getTags);
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
          <div class="tag-panel-container">
            <p>按标签过滤：</p>
            <div class="tag-panel">
              <button @click="toggleTagFilter(tag)" :class="{ active: parseRouteParams().tags.includes(tag) }"
                class="normal-flat-button" v-for="tag in tags">{{ tag }}</button>
              <FlexCore gap="16px" v-show="tagTipShow">
                <FlexCore vertical-alignment="center" gap="4px" orientation="row">
                  <SvgView size="1em" name="error" />
                  <p>{{ tagTip }}</p>
                </FlexCore>
              </FlexCore>
            </div>
          </div>

          <hr v-if="pagination.totalPages > 1">

          <!-- 分页按钮 -->
          <div class="pagination" v-if="pagination.totalPages > 1">
            <button class="normal-flat-button" v-for="page in pagination.totalPages" :key="page"
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
        第 {{ pagination.page }} 页 / 共 {{ pagination.totalPages }} 页
        ({{ pagination.total }} 篇)
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

.tag-panel-container {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.tag-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  button {
    border: 1px dashed white;
    cursor: pointer;

    &.active {
      background-color: rgba(255, 255, 255, 1);
      color: rgba(30, 30, 30, 1);
      transition: none;
    }
  }
}

.pagination {
  display: flex;
  gap: 8px;

  button {
    border: 1px dashed white;
    cursor: pointer;

    &.active {
      background-color: rgba(255, 255, 255, 1);
      color: rgba(30, 30, 30, 1);
      transition: none;
    }
  }
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

  .tag-panel-container {
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
