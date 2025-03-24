<script setup lang="ts">
import Card from "@/components/base/BaseCard.vue";
import FlexCore from "@/components/base/FlexCore.vue";
</script>

<template>
  <FlexCore class="container" gap="16px">

    <Card>
      <FlexCore gap="24px">
        <FlexCore gap="4px">
          <h1>关于 Yumeka</h1>
          <p>
            Vue3 打造的轻量级个人博客, 持续进化中~ ✨
          </p>
        </FlexCore>

        <FlexCore gap="12px">
          <FlexCore gap="4px">
            <h3>为啥要做这个？</h3>
            <h4>🎯 ​最初目的</h4>
            <p>本来是应付前端课期末作业的小项目, 结果 Vue3 用着感觉还不错，也为了以后多给自己留一条路，打算深入学习 Vue , 现在正在努力把它变成功能齐全的个人博客~</p>
          </FlexCore>

          <FlexCore gap="4px">
            <h4>🛠️ ​项目使用</h4>
            <p>前端: <a href="https://vuejs.org/">Vue3</a> 秒了</p>
            <p>后端: 一开始用我最爱的 C# 写的 ASP.NET Core Web API, 现在已经换成了 <a href="https://nodejs.org/">Node.js</a> (๑•̀ㅂ•́)و✧</p>
            <p>数据库: <a href="https://www.mongodb.com/">MongoDB</a></p>
          </FlexCore>
        </FlexCore>
      </FlexCore>
    </Card>

    <Card>
      <FlexCore gap="24px">
        <h1>联系我</h1>
        <FlexCore gap="6px" orientation="horzonial">
          <a href="https://space.bilibili.com/1650726013">
            <img src="https://img.shields.io/badge/Bilibili-KlxPiao-ff6699?logo=bilibili" alt="Bilibili:KlxPiao">
          </a>

          <a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1979287894">
            <img src="https://img.shields.io/badge/QQ-992181692-faad01?logo=qq" alt="QQ:1979287894">
          </a>

          <a href="https://github.com/miniyu157">
            <img src="https://img.shields.io/badge/GitHub-miniyu157-fff?logo=github" alt="GitHub:miniyu157">
          </a>

          <a href="https://music.163.com/#/user/home?id=4032263891">
            <img
              src="https://img.shields.io/badge/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90-e60026?logo=youtube-music"
              alt="Music 163">
          </a>
        </FlexCore>
      </FlexCore>
    </Card>

  </FlexCore>
</template>

<style scoped>
.container {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

a {
  color: rgb(158, 249, 255);
}
</style>
