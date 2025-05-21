<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: 'no tag',
    }
});

const hue = computed(() => {
    return Array.from(props.text)
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
});
</script>

<template>
    <button class="tag-button def-small-but" :style="{ '--hue': hue }">
        {{ text }}
    </button>
</template>

<style scoped lang="scss">
.tag-button {
    background-color: hsl(var(--hue), var(--tag-but-back-sl));

    border: 1px solid hsl(var(--hue), var(--but-border-sl));

    &:hover {
        background-color: hsl(var(--hue), var(--but-border-sl));
        color: white;
    }
}
</style>