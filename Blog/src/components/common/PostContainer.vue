<script setup lang="ts">
import Card from '../common/Card.vue';
import FlexCore from '../common/FlexCore.vue';
import SvgView from '../common/SvgView.vue';
</script>

<template>

    <Card class="post-container">
        <FlexCore direction="column" gap="2em">
            <button @click="$router.back" class="def-medium-but a-self-start">
                <FlexCore gap="4px">
                    <SvgView name="back" scale="0.8" />
                    <span>返回</span>
                </FlexCore>
            </button>

            <article>
                <slot></slot>
            </article>
        </FlexCore>
    </Card>

</template>

<style scoped lang="scss">
.card {
    padding: 2em !important;
}
</style>