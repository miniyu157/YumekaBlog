<script setup lang="ts">
import LinkCard from '../LinkCard.vue';

interface LinkInfo {
    title?: string;
    subtitle?: string;
    link?: string;
    image?: string;
}

const links: LinkInfo[] = [
    {
        title: "SlimeNull",
        subtitle: "为了更好的开源世界~",
        link: "https://slimenull.com/",
        image: "/src/assets/images/friend/slimenull_blog.png"
    },
    {
        title: "鸽子窝",
        subtitle: "咕咕咕~",
        image: "/src/assets/images/friend/gezi_blog.png"
    },
    {
        title: "風雪城",
        subtitle: "浩繁星空下的一场稚嫩的梦~",
        link: "https://chyk.ink/",
        image: "/src/assets/images/friend/chykink_blog.png"
    },
    {},
    {},
    {}
];
</script>

<template>
    <div class="container">
        <div class="main-grid">
            <LinkCard v-for="(linkInfo, index) in links" :key="index" :title="linkInfo.title"
                :subtitle="linkInfo.subtitle" :link="linkInfo.link" :image="linkInfo.image" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}
</style>