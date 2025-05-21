<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    shadowEnabled: {
        type: Boolean,
        default: true,
    },
    pressEffect: {
        type: Boolean,
        default: false,
    },
    paddingSize: {
        type: String as PropType<'normal' | 'small' | 'no'>,
        default: 'normal',
        validator: (value: string) => ['normal', 'small', 'no'].includes(value)
    }
});
</script>

<template>
    <div class="card" :class="{
        'has-shadow': shadowEnabled,
        'press-effect': pressEffect,
        'padding-normal': paddingSize === 'normal',
        'padding-small': paddingSize === 'small',
        'padding-no': paddingSize === 'no',
    }">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.card {
    overflow: hidden;
    border-radius: var(--big-corner);
    background-color: var(--card-back);
    transition: box-shadow 0.2s ease-in-out, scale 0.2s;

    &.has-shadow {
        box-shadow: var(--card-shadow);

        &:hover {
            box-shadow: var(--card-hover-shadow);
        }
    }

    &.press-effect:active {
        scale: 0.9;
    }

    &.padding-normal {
        padding: 1em;
    }

    &.padding-small {
        padding: 8px 12px;
    }

    &.padding-no {
        padding: 0;
    }
}
</style>