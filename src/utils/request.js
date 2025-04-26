import axios from 'axios';
import Logger from './logger';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 全局配置：非开发环境不抛出HTTP错误（但浏览器仍会记录原生XHR错误）
  validateStatus: function (status) {
    return true; // 所有状态码均不触发reject
  },
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (import.meta.env.MODE === 'development') {
      Logger.log('Response:', response);
    }
    return response.data;
  },
  error => {
    const env = import.meta.env.MODE || 'development';

    // 开发环境：打印完整错误
    if (env === 'development') {
      Logger.error('Request Error:', error);
    }
    // 非开发环境：完全静默，不记录任何日志
    // 可选：上报错误到监控系统（如Sentry）

    // 返回统一的错误格式，避免泄露细节
    return Promise.reject({
      success: false,
      code: error.response?.status || 'NETWORK_ERROR',
      message: 'Request failed', // 对用户隐藏具体错误
      ...(env === 'development' && { originalError: error }), // 仅开发环境携带原始错误
    });
  }
);

export default service;
