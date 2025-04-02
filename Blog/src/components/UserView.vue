<script setup lang="ts">
import Card from "@/components/common/BaseCard.vue";
import FlexCore from "@/components/common/FlexCore.vue";
import { ref } from "vue";

const postCount = ref(11);
const tagCount = ref(45);
const visitCount = ref(14);

</script>

<template>
  <Card class="root">
    <FlexCore gap="16px">
      <FlexCore gap="8px" horizontal-alignment="center" class="part-1">
        <img class="head-icon" src="/src/assets/images/yumeka.jpg" />
        <h2 class="unline-height">Yumeka</h2>
      </FlexCore>

      <FlexCore gap="16px" horizontal-alignment="center" class="part-2">
        <div class="data-grid">
          <span>文章</span>
          <span>分类</span>
          <span>访问量</span>
          <span>{{ postCount }}</span>
          <span>{{ tagCount }}</span>
          <span>{{ visitCount }}</span>
        </div>

        <button @click="$router.push('/postlist')" class="flat-button friend-circle-button">全部文章</button>

      </FlexCore>
    </FlexCore>
  </Card>
</template>

<style scoped>
.root {
  padding: 24px 0;
}

.friend-circle-button {
  width: 60%;
  padding: 6px 12px;
}

.head-icon {
  width: 60%;
  border-radius: 50%;

  transition: transform 0.3s ease;
}

.head-icon:hover {
  transform: rotate(360deg);
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  gap: 16px;

  align-items: center;
  justify-items: center;
}
</style>
