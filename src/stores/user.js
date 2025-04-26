import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Logger from '../utils/logger';
import { loginByPassword as login } from '../api/auth/auth';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null);
  const token = ref(localStorage.getItem('token') || null);

  const isLoggedIn = computed(() => !!token.value);

  const setUser = (info, authToken) => {
    userInfo.value = info;
    token.value = authToken;
    localStorage.setItem('token', authToken);
  };

  const clearUser = () => {
    userInfo.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  const loginUser = async credentials => {
    try {
      const res = await login(credentials);
      if (res && res.success) {
        setUser(res.data.user, res.data.token);
        return true;
      }
      Logger.error('登录失败:', res?.message || '未知错误');
      return false;
    } catch (error) {
      Logger.error('登录失败:', error);
      return false;
    }
  };

  const logoutUser = async () => {
    clearUser();
  };

  return {
    userInfo,
    token,
    isLoggedIn,
    login: loginUser,
    logout: logoutUser,
  };
});
