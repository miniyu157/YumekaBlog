import ColumnLayout from "@/components/ColumnLayout.vue";
import NavLayout from "@/components/NavLayout.vue";
import About from "@/components/pages/About.vue";
import BlogHome from "@/components/pages/BlogHome.vue";
import Error from "@/components/pages/Error.vue";
import Friend from "@/components/pages/Friend.vue";
import Home from "@/components/pages/Home.vue";
import Post from "@/components/pages/Post.vue";
import PostList from "@/components/pages/PostList.vue";

import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: NavLayout,
    children: [
      {
        path: "",
        redirect: "/blog",
      },
      {
        path: "blog",
        component: ColumnLayout,
        children: [
          {
            path: "",
            component: BlogHome,
          },
          {
            path: "postview",
            component: Post,
          },
          {
            path: "/friend",
            component: Friend,
          },
          {
            path: "/about",
            component: About,
          },
        ],
      },
      {
        path: "postlist",
        component: PostList,
      },
    ],
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
