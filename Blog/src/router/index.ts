import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import About from "@/components/pages/About.vue";
import TwoColumnLayout from "@/components/pages/TwoColumnLayout.vue";
import PostList from "@/components/pages/PostList.vue";
import PostsPreview from "@/components/pages/PostsPreview.vue";
import CreatePost from "@/components/pages/CreatePost.vue";
import NotFound from "@/components/pages/NotFound.vue";
import NavLayout from "@/components/pages/NavLayout.vue";
import Home from "@/components/pages/Home.vue";
import PostView from "@/components/pages/PostView.vue";

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
        component: TwoColumnLayout,
        children: [
          {
            path: "",
            component: PostsPreview,
          },
          {
            path: "postview",
            component: PostView,
          },
        ],
      },
      {
        path: "about",
        component: About,
      },
      {
        path: "postlist",
        component: PostList,
      },
      {
        path: "create",
        component: CreatePost,
      },
    ],
  },
  {
    path: "/home",
    component: Home,
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
