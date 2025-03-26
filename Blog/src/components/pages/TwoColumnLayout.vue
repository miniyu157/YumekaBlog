<script setup lang="ts">
import { ref } from "vue";

import NormalCard from "@/components/common/NormalCard.vue";
import FlexCore from "@/components/common/FlexCore.vue";
import UserView from "@/components/UserView.vue";
import SearchView from "@/components/SearchView.vue";
import SettingsView from "@/components/SettingsView.vue";
import TagBox from "@/components/TagBox.vue";
import RouterViewPanel from "@/components/common/RouterViewPanel.vue";

</script>

<template>

  <div id="mainGrid">
    <!-- 左侧区域 -->
    <FlexCore gap="16px">
      <UserView />

      <SearchView />

      <SettingsView />

      <TagBox />

      <NormalCard title="This a card">
        <p class="subtitle">Zelto mqru fiep gaxo ujik. Vrinb qsot xelp? Fkraw zsmo ytix.</p>
      </NormalCard>

      <NormalCard title="This a card">
        <p class="subtitle">这是一个卡片吗？哦！原来这是一个卡片。<br><br>V me 50 treat me to a KFC豪华套餐</p>
      </NormalCard>
    </FlexCore>

    <!-- 右侧区域 -->
    <RouterViewPanel />
  </div>
</template>

<style scoped>
#mainGrid {
  display: grid;
  grid-template-columns: minmax(0, 25fr) minmax(0, 75fr);
  gap: 16px;
}

@media (max-width: 1200px) {
  #mainGrid {
    grid-template-columns: minmax(0, 28fr) minmax(0, 72fr);
  }
}
</style>
