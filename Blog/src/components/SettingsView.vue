<script setup lang="ts">
import { useSettings } from '../cssVars/useSettings.ts';

import NormalCard from "@/components/NormalCard.vue";
import StackPanel from "@/components/StackPanel.vue";

defineProps({
  isShow: {
    type: Boolean,
    default: true,
  }
})

const presetsSelect = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const selectedName = selectElement.value;

  useSettings.usePreset(selectedName);
};

const presets = useSettings.presets;
</script>

<template>
  <normal-card v-show="isShow" :collapsible="true" :initial-expanded="false" title="设置">
    <stack-panel gap="12px">
      <p class="subtitle">外观</p>
      <div class="settings-grid">
        <p>卡片圆角 {{ useSettings.cardCorner.value }} px</p>
        <input type="range" min="0" max="60" v-model.number="useSettings.cardCorner.value">

        <p>卡片模糊 {{ useSettings.cardBlur.value }} px</p>
        <input type="range" min="0" max="24" v-model.number="useSettings.cardBlur.value">

        <p>卡片饱和度 {{ useSettings.cardSaturate.value }} %</p>
        <input type="range" min="0" max="200" v-model.number="useSettings.cardSaturate.value">

        <p>卡片阴影 {{ useSettings.cardShadow.value * 100 }} %</p>
        <input type="range" min="0" max="1" step="0.1" v-model.number="useSettings.cardShadow.value">

        <p>背景模糊 {{ useSettings.bgBlur.value }} px</p>
        <input type="range" min="0" max="24" v-model.number="useSettings.bgBlur.value">

        <p>背景饱和度 {{ useSettings.bgSaturate.value }}%</p>
        <input type="range" min="0" max="200" v-model.number="useSettings.bgSaturate.value">

        <p>背景亮度 {{ useSettings.bgBrightness.value }}%</p>
        <input type="range" min="0" max="100" v-model.number="useSettings.bgBrightness.value">
      </div>

      <stack-panel class="presets" orientation="horizontal">
        <p class="subtitle">使用预设</p>
        <select @change="presetsSelect" style="padding: 4px 8px;" class="presets-select">
          <option v-for="preset in presets" :key="preset.name" :value="preset.name">
            {{ preset.name }}
          </option>
        </select>
      </stack-panel>
    </stack-panel>
  </normal-card>
</template>

<style scoped>

p {
  margin: 0;
}

.settings-grid {
  display: grid;
  grid-template-columns: minmax(0, 50fr) minmax(0, 50fr);
  margin-left: 0.2em;
  gap: 12px;

  p {
    margin: 0;
    font-size: 11pt;
  }
}

.presets {
  display: flex;
  justify-content: space-between;
}

.presets-select {
  border-radius: var(--small-corner-radius);
  background-color: var(--default-background);
  color: currentColor;
}

input {
  -webkit-appearance: none;
  appearance: none;

  margin: 0;
  background: transparent;

  cursor: pointer;
}

input::-webkit-slider-runnable-track {
  height: 3px;
  border-radius: var(--circle-radius);
  border: 2px solid var(--default-border-color);
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 16px;
  height: 16px;
  background: rgb(226, 226, 226);
  border-radius: 50%;
  transform: translateY(-50%);
}
</style>
