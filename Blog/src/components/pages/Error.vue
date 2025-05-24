<script setup lang="ts">
import FlexCore from '../common/FlexCore.vue';
</script>

<template>
    
    <FlexCore gap="1em" class="container" direction="column">
        <span class="t1">🐰✨</span>
        <span class="t2">哎呀～小可爱你迷路了嘛(´•ω•̥`)</span>
        <span class="t3">你想去「{{ $route.path }}」星球吗？</span>
        <span class="t4">这里只有软软的兔兔和棉花云哦～</span>

        <RouterLink class="go-home a-self-start" to="/home">
            <span>带兔兔回家🎀</span>
        </RouterLink>
    </FlexCore>

</template>

<style scoped lang="scss">
.container {
    background: linear-gradient(135deg, #ffe6f0 0%, #f1e1ff 100%);
    padding: 4em;
}

.t1 {
    font-size: 8rem;
}

.t2 {
    font-weight: bold;
    color: #ff7eb8;
    font-size: 2.5rem;
    text-shadow: 2px 2px 0px white;
}

.t3 {
    color: #a56de2;
    font-size: 1.4rem;
}

.t4 {
    color: #ff9ec6;
    font-size: 1.2rem;
}

.go-home {
    background: white;
    padding: 1rem 2rem;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(255, 126, 184, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
    margin-top: 2em;

    &:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 8px 25px rgba(255, 126, 184, 0.5);
    }

    span {
        background: linear-gradient(45deg, #ff7eb8, #a56de2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: 1.5em;
        font-weight: bold;
    }
}
</style>
