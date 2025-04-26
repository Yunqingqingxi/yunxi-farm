<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const theme = ref('light')

// 初始化主题和语言
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  const savedLocale = localStorage.getItem('locale') || 'zh-CN'
  theme.value = savedTheme
  locale.value = savedLocale
  applyTheme(savedTheme)
})

// 监听主题变化
watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
})

// 监听语言变化
watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale)
})

// 应用主题到body
function applyTheme(theme) {
  document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light'
}

// 切换主题
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 切换语言
function toggleLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <div class="app-container">
    <div class="control-buttons">
      <button @click="toggleTheme" class="theme-toggle">
        {{ theme === 'light' ? '🌙 ' + $t('common.nightMode') : '☀️ ' + $t('common.dayMode') }}
      </button>
      <button @click="toggleLocale" class="locale-toggle">
        {{ locale === 'zh-CN' ? '🌐 English' : '🌐 中文' }}
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.control-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.theme-toggle,
.locale-toggle {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover,
.locale-toggle:hover {
  opacity: 0.9;
}
</style>
