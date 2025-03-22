import { createRouter, createWebHistory } from "vue-router";
import About from "@/components/routerView/About.vue";
import Home from "@/components/routerView/home/Home.vue";
import PostList from "@/components/routerView/home/PostList.vue";
import PostsPreview from "@/components/routerView/home/PostsPreview.vue";
import CreatePost from "@/components/routerView/CreatePost.vue";

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
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
