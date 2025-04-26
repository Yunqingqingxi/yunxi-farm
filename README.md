# Vue3 多语言主题模板

## 功能特性
- Vue3 + Vite 项目模板
- 支持中英文双语切换
- 支持日间/夜间主题切换
- 状态持久化(localStorage)
- SCSS全局样式管理

## 快速开始
1. 克隆项目
```bash
git clone [项目地址]
```
2. 安装依赖
```bash
npm install
```
3. 开发模式
```bash
npm run dev
```
4. 生产构建
```bash
npm run build
```

## 使用说明
1. 添加新语言：
   - 在`src/locales/`下新建语言文件
   - 在`src/i18n.js`中导入并配置

2. 添加新主题：
   - 修改`src/assets/scss/_variables.scss`中的主题变量
   - 更新`src/App.vue`中的主题切换逻辑

3. 使用翻译：
   - 模板中使用`$t('key')`
   - JS中使用`useI18n()`

## 项目结构
```
src/
├── assets/          # 静态资源
├── components/      # 组件
├── locales/         # 语言文件
├── App.vue          # 根组件
├── i18n.js          # 国际化配置
└── main.js          # 入口文件
```

## 依赖说明
- vue-i18n@9.x
- sass@1.87.x
- vue@3.x
