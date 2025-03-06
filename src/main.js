import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/style/index.css';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/iconfont/iconfont.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');