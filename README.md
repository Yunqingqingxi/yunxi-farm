# Vue3 企业级后台模板

## 项目概述

这是一个基于Vue3 + Vite + Element Plus构建的企业级后台管理系统模板，包含完整的国际化、主题切换、权限控制和常用组件封装，可直接作为项目基础模板使用。

## 核心特性

✔ Vue3 + Vite 现代化前端架构  
✔ 国际化多语言支持(中英文)  
✔ 动态主题切换(日间/夜间模式)  
✔ 基于Pinia的状态管理  
✔ 完整的路由权限控制  
✔ 常用业务组件封装  
✔ SCSS全局样式体系  
✔ 响应式布局适配  

## 快速开始

### 环境要求
- Node.js 16+
- npm 8+ 或 yarn 1.22+

### 安装运行
```bash
# 克隆项目
git clone [项目地址]

# 进入目录
cd yunxi-farm

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 项目结构

```
├── public/               # 静态资源
├── src/
│   ├── api/              # 接口封装
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── locales/          # 国际化配置
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .eslintrc.js          # ESLint配置
├── .prettierrc           # Prettier配置
├── vite.config.js        # Vite配置
└── package.json          # 依赖配置
```

## 模板使用指南

### 1. 配置修改
- 修改`vite.config.js`中的基础路径
- 更新`package.json`中的项目信息

### 2. 添加新页面
1. 在`src/views/`下创建页面组件
2. 在`src/router/index.js`中添加路由配置

### 3. 国际化支持
- 添加语言文件到`src/locales/`
- 在`src/i18n.js`中注册新语言
- 使用`$t('key')`或`useI18n()`进行翻译

### 4. 主题定制
修改`src/assets/scss/themes/_variables.scss`中的变量：
```scss
// 日间主题
$light-theme: (
  primary: #409EFF,
  background: #f5f7fa
);

// 夜间主题
$dark-theme: (
  primary: #409EFF,
  background: #1f1f1f
);
```

## 最佳实践

1. API请求统一通过`src/api/`目录管理
2. 全局状态使用Pinia存储在`src/stores/`
3. 公共组件放在`src/components/`对应分类下
4. 业务页面组件放在`src/views/`对应模块下

## 依赖说明

```json
{
  "vue": "^3.3.0",
  "vue-router": "^4.2.0",
  "pinia": "^2.1.0",
  "vue-i18n": "^9.2.0",
  "element-plus": "^2.3.0",
  "sass": "^1.87.0"
}
```

## 许可证

MIT License
