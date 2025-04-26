<template>
  <div class="user">
    <h1>{{ $t('user.title') }}</h1>
    <el-button type="primary" @click="handleAddUser">
      {{ $t('user.add') }}
    </el-button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import message from '@/utils/message.js';

const { t } = useI18n();
const { success } = message;

const handleAddUser = () => {
  success(t('user.addSuccess'));
};
</script>

<style lang="scss" scoped>
.user {
  padding: 20px;
  h1 {
    color: var(--primary);
    margin-bottom: 20px;
  }
}
</style>
