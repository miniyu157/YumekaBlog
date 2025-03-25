<script setup lang="ts">
import FlexCore from '@/components/common/FlexCore.vue';
import Card from '@/components/common/BaseCard.vue';
import SvgView from '@/components/common/SvgView.vue';

import { ref } from 'vue';

const postTitle = ref();
const postContent = ref();

</script>

<template>
  <div class="main-grid">
    <Card>
      <FlexCore vertical-alignment="center" gap="16px">
        <input placeholder="在此输入文章标题" class="title-input normal-input" v-model="postTitle">
        <textarea placeholder="在此输入文章内容" class="content-input normal-input" v-model="postContent"></textarea>
      </FlexCore>
    </Card>

    <FlexCore gap="16px">

      <Card>
        <FlexCore gap="8px">
          <FlexCore horizontal-alignment="space-between" orientation="row" gap="16px">
            <h3>文章封面</h3>
            <button class="flat-button">本地上传/外部链接</button>
          </FlexCore>
          <img>
          <FlexCore horizontal-alignment="space-between" orientation="row" gap="16px">
            <p>未选择图像</p>
            <button class="small-button">点击上传</button>
          </FlexCore>
        </FlexCore>
      </Card>

      <Card class="main-grid-item2">
        <FlexCore gap="8px">
          <FlexCore orientation="row" horizontal-alignment="space-between">
            <h3>标签</h3>
            <FlexCore orientation="row" gap="8px">
              <input>
              <button class="small-button">
                <SvgView name="plus"></SvgView>
              </button>
              <button class="small-button">
                <SvgView name="minus"></SvgView>
              </button>
            </FlexCore>
          </FlexCore>

          <p class="subtitle">暂无标签</p>
        </FlexCore>
      </Card>

    </FlexCore>

  </div>

</template>

<style scoped lang="scss">
$corner-radius: 8px;

.main-grid {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 16px;
}

.main-grid-item2 {
  min-width: 150px;
}

h3,
p {
  margin: 0;
  flex-shrink: 0;
  /* 防止被压缩 */
}

img {
  border-radius: $corner-radius;
  border: 1px solid var(--default-border-color);
  aspect-ratio: 16 / 9;
}

.normal-input {
  border-radius: $corner-radius;
  background-color: transparent;
  border: 1px solid var(--default-border-color);
  padding: 4px 8px;
  outline: none;
  color: currentColor;

  flex-grow: 1;
  /* 占满剩余空间 */

  font-size: 12pt;
}

.normal-input::placeholder {
  color: currentColor;
  opacity: 66%;
}

.content-input {
  height: 80vh;
}

button {
  font-size: 0.9em;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
