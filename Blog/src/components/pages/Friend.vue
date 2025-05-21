<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FriendCard from '../common/FriendCard.vue';
import { httpget, ServerIP, type FriendLink, type FriendLinksResponse } from '@/http/http';
import LoadingTip from '../common/LoadingTip.vue';

const friends = ref<FriendLink[]>();

const loadingTip = ref<[string, string]>([
    '加载朋友列表...',
    '应该会很快的...(应该吧？)'
]);

const loadFriends = async () => {
    try {
        const { links: responseLinks } = await httpget.getFriendlinks();
        friends.value = responseLinks;

        // 补全链接前缀
        friends.value = responseLinks.map(responseLinks => ({
            ...responseLinks,
            image: `${ServerIP}${responseLinks.image}`
        }));

        loadingTip.value = [
            responseLinks.length == 0 ? '朋友列表竟然是空的...(*ﾟーﾟ)' : '',
            '网络很正常，数据库空空'
        ];

    } catch (error: any) {
        console.log(error);

        loadingTip.value = [
            '与服务器的连接跑丢了呢...(*ﾟーﾟ)',
            error.message || `未知错误`
        ];
    }
};

onMounted(() => {
    loadFriends();
});
</script>

<template>
    <div>
        <LoadingTip :texts="loadingTip" />

        <div class="main-grid">
            <FriendCard v-for="(link, index) in friends" :key="index" v-bind="link" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@keyframes card-enter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.main-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .friend-card {
        opacity: 0;
        animation: card-enter 0.6s forwards;

        // 每个卡片依次延迟
        @for $i from 1 through 6 {
            &:nth-child(#{$i}) {
                animation-delay: 0.1s * $i;
            }
        }
    }
}

.tip {
    text-align: center;
}

@media (max-width: 1100px) {
    .main-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>