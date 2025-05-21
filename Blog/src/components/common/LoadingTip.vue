<script setup lang="ts">
import FlexCore from './FlexCore.vue';

interface Props {
    texts?: [string, string]
}

const props = withDefaults(defineProps<Props>(), {
    texts: () => ['正在加载...', 'Loading...']
});

</script>

<template>
    <FlexCore class="loading-tip" v-show="props.texts[0] != ''" gap="4px">
        <div class="rectangle"></div>
        <FlexCore direction="column">
            <span>{{ props.texts[0] }}</span>
            <span class="small-text">{{ props.texts[1] }}</span>
        </FlexCore>
    </FlexCore>
</template>

<style lang="scss">
.loading-tip>.rectangle {
    width: 3px;
    background-color: hsl(var(--primary-hue), var(--icon-sl));
}
</style>