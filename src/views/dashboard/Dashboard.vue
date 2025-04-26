<template>
  <div class="dashboard">
    <h1>{{ $t('dashboard.title') }}</h1>
    <div class="stats">
      <el-card>
        <h3>{{ $t('dashboard.users') }}</h3>
        <p class="number">1,024</p>
      </el-card>
      <el-card>
        <h3>{{ $t('dashboard.orders') }}</h3>
        <p class="number">256</p>
      </el-card>
      <el-card>
        <h3>{{ $t('dashboard.revenue') }}</h3>
        <p class="number">¥12,800</p>
      </el-card>
    </div>
    <el-button type="primary" @click="refreshData">
      {{ $t('dashboard.refresh') }}
    </el-button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import message from '@/utils/message.js';

const { t } = useI18n();
const { success } = message;

const refreshData = () => {
  success(t('dashboard.refreshSuccess'));
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;
  h1 {
    color: var(--primary);
    margin-bottom: 20px;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
    .number {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary);
    }
  }
}
</style>
