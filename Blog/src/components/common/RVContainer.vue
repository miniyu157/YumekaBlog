<template>
  <router-view class="router-view" v-slot="{ Component, route }">
    <transition name="route-anim" mode="out-in">
      <Suspense>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </Suspense>
    </transition>
  </router-view>
</template>
<style scoped>
/* #Bug 过渡时 card 的 fliter 失效 */
.route-anim-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.route-anim-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.route-anim-enter-from,
.route-anim-leave-to {
  filter: blur(10px);
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}
</style>
