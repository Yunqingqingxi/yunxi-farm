<template>
  <div class="home">
    <h1>{{ $t('home.title') }}</h1>
    <el-button type="primary" @click="showMessage">{{ $t('home.testButton') }}</el-button>
  </div>
</template>

<script setup>
import message from '@/utils/message.js';
import { useI18n } from 'vue-i18n';

const { success } = message;
const { t } = useI18n();

const showMessage = () => {
  success(t('home.welcomeMessage'));
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  h1 {
    color: var(--primary);
    margin-bottom: 20px;
  }
}
</style>
