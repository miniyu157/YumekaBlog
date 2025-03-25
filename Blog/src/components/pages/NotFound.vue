<template>
  <div class="not-found">
    <div class="bunny">🐰✨</div>
    <h1>哎呀～小可爱你迷路了嘛(´•ω•̥`)</h1>
    <p class="path-tip">你想去「{{ $route.path }}」星球吗？</p>
    <p class="hint">这里只有软fufu的兔兔和棉花云哦～</p>

    <div class="cloud-group">
      <div class="cloud">☁️</div>
      <div class="cloud">☁️</div>
      <div class="cloud">☁️</div>
    </div>

    <RouterLink class="go-home" to="/">
      <span class="btn-inner">带兔兔回家🎀</span>
    </RouterLink>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.not-found {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #ffe6f0 0%, #f1e1ff 100%);
  font-family: 'Indie Flower', cursive;
  position: relative;
  overflow: hidden;
}

h1 {
  color: #ff7eb8;
  font-size: 2.5rem;
  margin: 1rem 0;
  text-shadow: 2px 2px 0px white;
}

.bunny {
  font-size: 8rem;
  animation: blink 2s infinite;
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

.cloud-group {
  position: absolute;
  width: 100%;
  height: 100px;
  opacity: 0.3;
  pointer-events: none;
}

.cloud {
  position: absolute;
  font-size: 4rem;
  animation: float 8s infinite linear;
}

.cloud:nth-child(1) {
  left: -10%;
  animation-delay: 0s
}

.cloud:nth-child(2) {
  left: -20%;
  animation-delay: 3s
}

.cloud:nth-child(3) {
  left: -15%;
  animation-delay: 5s
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

@keyframes blink {

  0%,
  100% {
    opacity: 1
  }

  50% {
    opacity: 0.8
  }
}

@keyframes float {
  from {
    transform: translateX(0) translateY(10px)
  }

  to {
    transform: translateX(120vw) translateY(-20px)
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem
  }

  .bunny {
    font-size: 6rem
  }
}
</style>
