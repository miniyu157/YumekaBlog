import { createRouter, createWebHistory } from "vue-router";
import About from "@/components/routerView/About.vue";
import Home from "@/components/home/Home.vue";
import PostList from "@/components/home/PostList.vue";
import PostsPreview from "@/components/home/PostsPreview.vue";

const routes = [
  {
    path: "/",
    redirect: "/home", // 将根路径重定向到 /home
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      // Home 默认子路由
      {
        path: "",
        name: "PostsPreview",
        component: PostsPreview,
      },
      {
        path: "posts",
        name: "Posts",
        component: PostList,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
