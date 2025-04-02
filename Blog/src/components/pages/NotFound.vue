<script setup lang="ts">
import FlexCore from '../common/FlexCore.vue';


</script>

<template>
  <div class="container">
    <div class="cloud-group">
      <div class="cloud">☁️</div>
      <div class="cloud">☁️</div>
      <div class="cloud">☁️</div>
      <div class="cloud">☁️</div>
    </div>

    <div class="not-found">
      <div class="bunny">🐰✨</div>
      <h1>哎呀～小可爱你迷路了嘛(´•ω•̥`)</h1>
      <p class="path-tip">你想去「{{ $route.path }}」星球吗？</p>
      <p class="hint">这里只有软fufu的兔兔和棉花云哦～</p>

      <RouterLink class="go-home" to="/">
        <span class="btn-inner">带兔兔回家🎀</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background: linear-gradient(135deg, #ffe6f0 0%, #f1e1ff 100%);
  min-height: 100vh;
}

.not-found {
  padding: 3rem;
}

.cloud-group {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;

  .cloud {
    position: absolute;
    font-size: 4rem;
    opacity: 0.8;
    animation: float 12s ease-in-out infinite;

    // 为每个云朵设置不同的动画参数
    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-duration: 14s;
      animation-delay: -2s;
    }

    &:nth-child(2) {
      top: 35%;
      left: 70%;
      animation-duration: 12s;
      font-size: 3.5rem;
    }

    &:nth-child(3) {
      top: 60%;
      left: 25%;
      animation-duration: 16s;
      animation-delay: -5s;
    }

    &:nth-child(4) {
      top: 50%;
      left: 80%;
      animation-duration: 10s;
      font-size: 4.5rem;
    }
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 0.8;
  }

  25% {
    transform: translateX(-20px) translateY(5px) scale(0.95);
  }

  50% {
    transform: translateX(15px) translateY(-8px) scale(1.05);
    opacity: 0.9;
  }

  75% {
    transform: translateX(-10px) translateY(3px) scale(0.98);
  }
}

.bunny {
  font-size: 8rem;
}

h1 {
  color: #ff7eb8;
  font-size: 2.5rem;
  margin: 1rem 0;
  text-shadow: 2px 2px 0px white;
}

.path-tip {
  color: #a56de2;
  font-size: 1.4rem;
  margin: 1rem 0;
}

.hint {
  color: #ff9ec6;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.go-home {
  display: inline-block;
  background: white;
  padding: 1rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 126, 184, 0.3);
  transition: all 0.3s ease;
  margin-top: 2rem;
}

.btn-inner {
  background: linear-gradient(45deg, #ff7eb8, #a56de2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
}

.go-home:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 126, 184, 0.5);
}
</style>
