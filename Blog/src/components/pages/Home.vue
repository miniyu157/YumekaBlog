<script setup lang="ts">
import { ref } from 'vue';
import FlexCore from '../common/FlexCore.vue';
import SvgView from '../common/SvgView.vue';
const activeText = ref();

const setActiveText = (newText: string) => {
  activeText.value = newText;
};
</script>

<template>
  <div class="root">
    <div class="main">
      <FlexCore gap="72px" class="item">
        <FlexCore class="title-panel" vertical-alignment="center" orientation="row" gap="36px">
          <img src="@/assets/images/yumeka.jpg">
          <FlexCore vertical-alignment="center">
            <h1>Yumeka の 🏠</h1>
            <p>yumeka.github.io</p>
          </FlexCore>
        </FlexCore>

        <FlexCore gap="16px">
          <div class="card tip-panel">
            <SvgView style="position: absolute; left: 1em; top: 0.8em;" name="quote-start" />
            <FlexCore gap="10px">
              <p class="tip-panel-title">Hello World!</p>
              <p>一个建立于 21 的小站，存活于互联网的边缘</p>
            </FlexCore>
            <SvgView style="position: absolute; right: 1em; bottom: 0.8em;" name="quote-end" />
          </div>

          <FlexCore @mouseenter="setActiveText('通过这里联系我')" vertical-alignment="center" orientation="row"
            horizontal-alignment="space-between" class="contact-info-panel">
            <FlexCore style="font-size: 1.2em;" gap="1em" orientation="row">
              <a @mouseenter="setActiveText('去 Github 看看')" href="https://github.com/miniyu157">
                <SvgView name="github" />
              </a>
              <a @mouseenter="setActiveText('有什么事吗')"
                href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1979287894">
                <SvgView name="qq" />
              </a>
              <a @mouseenter="setActiveText('来封 Email')" href="mailto:klxpiao@elecho.dev">
                <SvgView name="e-mail" />
              </a>
              <a @mouseenter="setActiveText('来 B 站看看~')" href="https://space.bilibili.com/1650726013">
                <SvgView name="bili" />
              </a>
            </FlexCore>
            <p>{{ activeText }}</p>
          </FlexCore>
        </FlexCore>
      </FlexCore>

      <FlexCore gap="24px" class="item">
        <FlexCore class="link-list-header" orientation="row" gap="0.5em">
          <SvgView name="link" />
          <p>网站列表</p>
        </FlexCore>

        <div class="link-list-grid">
          <div @click="$router.push('/blog');" class="link card">
            <SvgView name="blog" />
            <p>博客</p>
          </div>
          <div @click="$router.push('/friend');" class="link card">
            <SvgView name="friend" />
            <p>友站</p>
          </div>
          <div @click="$router.push('/lab');" class="link card">
            <SvgView name="lab" />
            <p>开发中...</p>
          </div>
          <div @click="$router.push('/lab');" class="link card">
            <SvgView name="lab" />
            <p>开发中...</p>
          </div>
          <div @click="$router.push('/lab');" class="link card">
            <SvgView name="lab" />
            <p>开发中...</p>
          </div>
          <div @click="$router.push('/lab');" class="link card">
            <SvgView name="lab" />
            <p>开发中...</p>
          </div>
        </div>
      </FlexCore>
    </div>

    <FlexCore vertical-alignment="center" horizontal-alignment="center" class="bottom-bar">
      <p>Copyright © 2025 miniyu157</p>
    </FlexCore>
  </div>
</template>


<style scoped lang="scss">
$cardBackColor: rgba(0, 0, 0, 0.3);
$cardCornerRadius: 8px;
$cardBackdropFilter: blur(10px) saturate(120%);
$cardHoverScale: 1.018;
$cardActiveScale: 0.9;
$linkCardHhoverBackColor: rgba(0, 0, 0, 0.45);

* {
  user-select: none;
}

.root {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
}

.main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 96px;
  font-size: 12pt;

  .item:nth-child(2) {
    align-self: flex-end;
  }
}

.bottom-bar {
  position: absolute;
  bottom: 0;
  min-width: 100vw;
  height: 50px;

  background-color: $cardBackColor;
  backdrop-filter: $cardBackdropFilter;
}

.title-panel {
  img {
    height: 8em;
    border-radius: 999px;
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(360deg);
    }
  }

  h1 {
    font-family: "Pacifico";
    font-size: 56pt;
    white-space: nowrap;
  }
}

.tip-panel {
  .tip-panel-title {
    font-family: "Pacifico";
  }

  padding: 2em 5em 2em 2em;
}

.contact-info-panel {
  transition: all 0.3s ease;
  border-radius: $cardCornerRadius;
  padding: 0.5em 1em;

  p {
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: $cardBackColor;
    backdrop-filter: $cardBackdropFilter;

    p {
      opacity: 1;
    }
  }

  a {
    display: flex;
    align-items: center;
  }
}

.link-list-header {
  font-size: 1.1em;
}

.link-list-grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);

  gap: 24px;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5em;
  aspect-ratio: 1/0.6;
  font-size: 13pt;
  cursor: pointer;

  &:hover {
    background-color: $linkCardHhoverBackColor;
  }
}

.card {
  background-color: $cardBackColor;
  backdrop-filter: $cardBackdropFilter;
  border-radius: $cardCornerRadius;

  transition: all 0.5s ease;

  &:hover {
    scale: $cardHoverScale;
  }

  &:active {
    scale: $cardActiveScale;
  }
}

/* * {
  border: 1px solid red;
} */

button,
input,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
label,
textarea {
  margin: 0;
}

a {
  color: currentColor;
}
</style>
