<script setup lang="ts">
import FlexCore from './common/FlexCore.vue';
import SvgView from './common/SvgView.vue';

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
</script>

<template>
    <a target="_blank" rel="noopener noreferrer" :href="props.link" class="link-card underline-from-center-parent">
        <img class="link-img" :src="props.image"
            @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400/eee/ccc?text=Image+Not+Found'">

        <div class="detail">
            <h1 class="link-title underline-from-center">{{ props.title }}</h1>
            <FlexCore orientation="row" vertical-alignment="center" gap="4px" class="link-subtitle">
                <SvgView size="2em" name="gps" />
                <p>{{ props.subtitle }}</p>
            </FlexCore>
        </div>
    </a>
</template>

<style lang="scss" scoped>
$img-anim: all 500ms ease;
$def-anim: all 380ms cubic-bezier(0, 1.5, 1, 1);

.underline-from-center {
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 4px;
        background: currentColor;
        transform: translateX(-50%);
        transition: all 300ms ease;

        border-radius: 5px 5px 0 0;
    }
}

.underline-from-center-parent {
    &:hover {
        .underline-from-center::after {
            width: 100%;
        }
    }
}

.link-card {
    color: currentColor;
    position: relative;
    user-select: none;
    cursor: pointer;

    aspect-ratio: 1/0.9;
    border: 3px solid rgba($color: rgb(255, 255, 255), $alpha: 0);
    border-radius: var(--card-corner-radius);
    box-shadow: var(--default-box-shadow);
    overflow: hidden;
    transition: $def-anim;

    .link-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.7);

        transition: $img-anim;
    }

    .detail {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;

        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .link-title {
        margin: 0;
        transform: translateY(50%);
        transition: $def-anim;

        align-self: center;
        text-align: center;
    }

    .link-subtitle {
        background-color: rgba($color: #000000, $alpha: 0.4);
        backdrop-filter: blur(8px) brightness(120%);
        border-radius: 8px;
        padding: 0.5em;
        opacity: 0;
        scale: 0.8;
        rotate: 8deg;

        transition: $def-anim;

        p {
            font-size: 0.9em;
            margin: 0;
            white-space: nowrap;
        }
    }

    &:hover {
        box-shadow: var(--hover-box-shadow);

        .link-img {
            scale: 1.2;
            filter: brightness(0.8);
        }

        .link-title {
            transform: translateY(0);
        }

        .link-subtitle {
            opacity: 1;
            scale: 1;
            rotate: 0deg;
        }
    }
}
</style>