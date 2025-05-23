<script setup lang="ts">
import Card from './Card.vue';
import FlexCore from './FlexCore.vue';
import SvgView from './SvgView.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'No Title'
    },
    subtitle: {
        type: String,
        default: 'No Subtitle'
    },
    link: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: 'https://placehold.co/600x400/eee/ccc?text=No+Image'
    }
});

const openLink = () => {
    if (props.link) {
        window.open(props.link, "_blank");
    }
};
</script>

<template>
    <Card class="friend-card">
        <FlexCore gap="8px" direction="column">
            <a :href="props.link" target="_blank" class="friend-cover">
                <FlexCore class="cover-fliter">
                    <SvgView name="go" class="mar-auto" fill="white" />
                </FlexCore>

                <img :src="props.image"
                    @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=Image+Not+Found'">
            </a>

            <FlexCore gap="8px" class="info-panel">
                <div class="rectangle"></div>
                <FlexCore direction="column" class="text">
                    <h2 @click="openLink" class="title mar-0">{{ props.title }}</h2>
                    <span class="subtitle">{{ props.subtitle }}</span>
                </FlexCore>
            </FlexCore>
        </FlexCore>
    </Card>

</template>

<style lang="scss" scoped>
.friend-cover {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;

    aspect-ratio: 1/0.55;
    border-radius: var(--big-corner);
    border: 1px solid rgba(109, 109, 109, 0.5);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }

    .cover-fliter {
        position: absolute;
        width: 100%;
        height: 100%;

        background-color: rgb(0, 0, 0, 0.5);
        transition: opacity 0.2s, scale 0.2s;
        font-size: 20pt;
        opacity: 0;
        scale: 1;

        &:hover {
            opacity: 0.55;
            scale: 1.2;
        }
    }

    transition: scale 0.1s;

    &:active {
        scale: 0.95;
    }
}

.info-panel {
    .rectangle {
        width: 4px;
        border-radius: var(--infinite-corner);
        background-color: var(--primary-fore-color);
    }

    .title {
        color: var(--primary-fore-color);
        cursor: pointer;
    }

    .subtitle {
        font-size: 0.9em;
    }

    .text {
        // 必须设置这两个属性，才能使其截断生效
        flex: 1;
        min-width: 0;

        .title,
        .subtitle {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>