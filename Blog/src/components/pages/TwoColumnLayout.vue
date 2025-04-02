<script setup lang="ts">
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
        <p>Id commodo proident incididunt ut do fugiat id in nulla sint veniam in quis.</p>
      </NormalCard>

      <NormalCard title="This a card">
        <p>Velit exercitation ipsum occaecat anim quis pariatur adipisicing proident aute sit voluptate laborum aliquip.</p>
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
