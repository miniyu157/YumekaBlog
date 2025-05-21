<script setup lang="ts">
import Card from '../common/Card.vue';
import FlexCore from '../common/FlexCore.vue';


</script>

<template>

    <Card>
        <FlexCore direction="column" gap="4px">
            <h1 class="title">Hi there 👋</h1>

            <span>这是一个由 Vue3 作为框架编写的个人博客网站</span>
            <span></span>
        </FlexCore>

    </Card>

</template>

<style scoped lang="scss">
.title {
    margin: 0 0 16px 0;
}
</style>