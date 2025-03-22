<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { tagsApi } from '@/http/getTags';

import NormalCard from '@/components/base/NormalCard.vue';
import SvgView from '@/components/base/SvgView.vue';
import FlexCore from '@/components/base/FlexCore.vue';

const tags = ref<string[]>([]);

const tip = ref("正在加载...");
const tipShow = computed(() => tip.value !== "");

const getTags = async () => {
  try {
    const tagsResponse = await tagsApi.getTags();
    tags.value = tagsResponse.tags;

    tip.value = tags.value.length == 0 ? "暂无标签" : "";

  } catch (error) {
    tip.value = "获取标签列表失败";
  }
};

onMounted(() => {
  getTags();
});

</script>

<template>
  <NormalCard :collapsible="true" :initial-expanded="false" title="标签">
    <div class="tag-panel">

      <button class="small-button" v-for="tag in tags">{{ tag }}</button>

      <FlexCore gap="16px" v-show="tipShow">
        <FlexCore vertical-alignment="center" gap="4px" orientation="row">
          <SvgView size="1em" name="error" />
          <p>{{ tip }}</p>
        </FlexCore>

      </FlexCore>

    </div>
  </NormalCard>
</template>

<style scoped>
.tip {
  font-size: 0.9em;
}

.tag-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

p {
  margin: 0;
}

button {
  flex-grow: 1;
}
</style>
