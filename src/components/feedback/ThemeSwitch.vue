<template>
  <div class="theme-switch">
    <el-switch v-model="isDark" @change="toggleTheme">
      <template #active-action>
        <el-icon><Moon /></el-icon>
      </template>
      <template #inactive-action>
        <el-icon><Sunny /></el-icon>
      </template>
    </el-switch>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useMainStore } from '@/stores';
import { Moon, Sunny } from '@element-plus/icons-vue';

const mainStore = useMainStore();
const isDark = ref(mainStore.theme === 'dark');

const toggleTheme = () => {
  console.log('当前store主题:', mainStore.theme);
  const newTheme = mainStore.theme === 'light' ? 'dark' : 'light';
  console.log('切换主题到:', newTheme);

  // 添加过渡类
  document.body.classList.add('theme-transitioning');

  // 设置短暂延迟确保动画可见
  setTimeout(() => {
    isDark.value = newTheme === 'dark';
    mainStore.setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);

    // 动画完成后移除过渡类
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
      console.log('主题切换完成');
    }, 500);
  }, 50);
};

watch(
  () => mainStore.theme,
  newTheme => {
    isDark.value = newTheme === 'dark';
    document.body.setAttribute('data-theme', newTheme);
  }
);
</script>

<style lang="scss" scoped>
.theme-switch {
  margin: 10px;
  display: flex;
  align-items: center;

  :deep(.el-switch) {
    --el-switch-on-color: #2d8cf0; /* 深蓝色 */
    --el-switch-off-color: #dcdfe6; /* 浅灰色 */
    transition: all 0.3s ease;
  }
}

:global(body) {
  transition:
    background-color 0.5s ease,
    color 0.3s ease;
}

:global(*) {
  transition:
    background-color 0.5s ease,
    border-color 0.5s ease;
}
</style>
