import { createApp } from 'vue';
import Logger from './utils/logger';

console.log('Vite环境变量:', import.meta.env);

// 开发环境显示当前环境信息
if (import.meta.env.MODE === 'development') {
  console.log('开发环境检测通过');
  Logger.log(`当前运行环境: ${import.meta.env.MODE}`);
  Logger.log(`API基础地址: ${import.meta.env.VITE_API_BASE_URL}`);
} else {
  console.log('当前环境:', import.meta.env.MODE);
}
import App from './App.vue';
import '@/assets/index.scss';
import i18n from './i18n';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(i18n).use(router).use(pinia).use(ElementPlus).mount('#app');
