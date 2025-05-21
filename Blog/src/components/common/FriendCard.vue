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
    window.open(props.link, "_blank");
};
</script>

<template>
    <Card class="friend-card">
        <FlexCore gap="8px" direction="column">
            <div @click="openLink" class="friend-cover">
                <img :src="props.image"
                    @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=Image+Not+Found'">
            </div>

            <FlexCore gap="8px" class="info-panel" main-axis="between">
                <FlexCore gap="8px">
                    <div class="rectangle"></div>
                    <FlexCore direction="column">
                        <h2 @click="openLink" class="title mar-0">{{ props.title }}</h2>
                        <span class="subtitle">{{ props.subtitle }}</span>
                    </FlexCore>
                </FlexCore>

                <!-- <div class="small-icon">
                    <img src="../../assets/images/avatar.jpg">
                </div> -->
            </FlexCore>

        </FlexCore>
    </Card>

</template>

<style lang="scss" scoped>
.friend-cover {
    overflow: hidden;
    aspect-ratio: 1/0.55;
    border-radius: var(--big-corner);
    border: 1px solid rgba(109, 109, 109, 0.5);
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;

        transition: scale 0.5s ease-in-out;
    }

    &:hover {
        img {
            scale: 1.2;
        }
    }
}

.info-panel {
    position: relative;

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

    .title,
    .subtitle {
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .small-icon {
        position: absolute;
        right: 0;
        height: 100%;
        max-height: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid rgba(109, 109, 109, 0.5);

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>