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
          <!-- <h1 class="meta-title">{{ post.title }}</h1> -->
          <h1 class="meta-title">川父法。委答离察乱内</h1>

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
        <!-- <div class="post-body" v-html="post.content"></div> -->

        <h2>如材门段岩了。煤死调，渐短衣反，坐批斯史春。</h2>
        <p>
          如材门段岩了。煤死调，渐短衣反，坐批斯史春。迫断怀满叶鱼！跟得触成，细些色今装，预背坏流甲球。乡夫听日宜，政命话，压务作部。村消过体太许。整兰人表杆千。胞之缩免。织确买，草饭济随效！很顺督其静换，顶热代何样。鲁换吗田，九马入。林负怀策。川父法。委答离察乱内。备降医，谈适奏。地频帮威今？无做共当混，众织标听易。北抓入刚联。既奏杀服。段充於示，之印巴，罗增政器宪攻。另世李利掌。四棉继前，致倒仅，给怎席。深罪稳花燃其。否促度，促格凯语神，料稳村复棉？宗虽均夜职。标青讨大。
        </p>
        <h2>怎喜硫酸以误。具月似略！</h2>
        <p>
          成夫值足产措。二华手说，村你移编染。怎喜硫酸以误。具月似略！术黄既引？李阻块烈未！续得减。钟回水测。总顾措景，它宁概织。输皮得绝抓够。欢产去！况伯果。理绿太。再命院护失洲？庆近急完号，文带阻村，座端统洲。降员比就否球。开历往径那化？协哥益，零布金。入层族另超，日点阳交变管，留认江调事打。差位斯细。材升保变。示套油。再述结。范怎游也。敌笔坚士！让散搞晚。已烧流取钢，元植玉。烈板参振大马。担资跑黑普，各例内音谁维。纸突呢。哪拿负红除，城季争绍容训。作研为穿苦於，激社菜克。普照单却亚，己态级范。洲露脸答迫者。生里足激。
        </p>
        <h2>读评称，发之千损用形。</h2>
        <p>
          独顶真供肉。永增城了跳。除校久东鸡停。希厂身己，战保乡掌，本站四夫民皇。输静皮集。织那乐缩斗。进扬特困误新。展但试。球损表想，元病反措席，单等知！杂既住。为命管。固优出好。改念呼吗从。分给孙端，且例学，兴多长宣凯科。井困沉即足车，宪身早。处至微久严测。多四眼迫举千。北请玉复章，益衣集里扩倒，清钢烟液。决向院穿。整富盐础。读评称，发之千损用形。朝措晶七近前，尽洋卫车，爱皇庆鲜答。解响满高盟烧，船权聚井题，差晚拉。靠爱液末聚改。层久人督。混翻少夫。抓析黑成。在贵械程翻。
        </p>
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

  align-self: start;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 2em;
  margin: 0;
}

p {
  font-size: 1.1em;
}

.post-content-container {
  padding: 16px;
}

.post-tags {
  display: flex;
  gap: 12px;

  margin-bottom: 16px;
}

.post-image-container {
  position: relative;

  &:hover {
    .meta-detail {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%; // 控制渐变高度
    background: linear-gradient(to top,
        rgba(0, 0, 0, 0.8) 20%, // 底部不透明度
        rgba(0, 0, 0, 0.4) 60%,
        transparent 100% // 顶部完全透明
      );
    pointer-events: none; // 防止遮挡交互
  }
}

.meta-detail {
  opacity: 0;
  transition: all 0.2s ease;
}

.post-image {
  width: 100%;
  aspect-ratio: 1/0.35;
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
