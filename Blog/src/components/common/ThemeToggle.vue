<script setup lang="ts">
import { cssVars } from '@/utils/cssVars';
import Card from './Card.vue';
import FlexCore from './FlexCore.vue';
import SvgView from './SvgView.vue';

const toggle = () => {
    if (cssVars.currentTheme.value === "light") {
        cssVars.currentTheme.value = "dark";
    } else if (cssVars.currentTheme.value === "dark") {
        cssVars.currentTheme.value = "auto";
    } else {
        cssVars.currentTheme.value = "light";
    }
}
</script>

<template>
    <Card @click="toggle" class="theme-toggle" padding-size="small" :press-effect="true">
        <FlexCore gap="8px">
            <SvgView :name="cssVars.currentTheme.value" :fill="cssVars.primaryForeColor" />
            <span>{{ { light: '亮色模式', dark: '暗色模式', auto: '跟随系统' }[cssVars.currentTheme.value] }}</span>
        </FlexCore>
    </Card>
</template>