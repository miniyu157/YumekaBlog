import "./assets/main.css";
import "./assets/rootStyle.css";
import "./assets/animation.css";
import "./assets/fonts.css";

import { createApp } from "vue";
import router from "./router/index.ts";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
