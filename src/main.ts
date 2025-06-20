import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "@/styles/main.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
