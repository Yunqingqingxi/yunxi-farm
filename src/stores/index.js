import { defineStore } from 'pinia';
import Logger from '../utils/logger';

// 主应用store
export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
    theme: localStorage.getItem('theme') || 'light',
    locale: 'zh-CN',
  }),
  actions: {
    increment() {
      this.count++;
    },
    setTheme(theme) {
      Logger.debug('store设置主题:', theme);
      this.theme = theme;
      Logger.debug('store当前主题:', this.theme);
    },
    toggleLocale() {
      this.locale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    },
  },
  persist: true, // 启用持久化
});

export * from './user';
