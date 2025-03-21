<template>
  <transition name="fade-blur" mode="out-in">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition>
</template>

<style scoped>
/* #Bug 过渡时 card 的 fliter 失效 */
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-blur-enter-from,
.fade-blur-leave-to {
  filter: blur(10px);
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}
</style>
