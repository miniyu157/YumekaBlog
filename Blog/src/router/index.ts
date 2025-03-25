import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import About from "@/components/pages/About.vue";
import Home from "@/components/pages/Home.vue";
import PostList from "@/components/pages/PostList.vue";
import PostsPreview from "@/components/pages/PostsPreview.vue";
import CreatePost from "@/components/pages/CreatePost.vue";
import NotFound from "@/components/pages/NotFound.vue";
import Main from "@/components/pages/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        component: Home,
        children: [
          {
            path: "",
            component: PostsPreview,
          },
        ],
      },
      {
        path: "about",
        component: About,
      },
      {
        path: "posts",
        component: PostList,
      },
      {
        path: "create",
        component: CreatePost,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
