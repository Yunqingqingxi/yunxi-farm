<template>
  <div class="settings">
    <h1>{{ $t('settings.title') }}</h1>
    <el-form>
      <el-form-item :label="$t('settings.theme')">
        <el-switch v-model="darkMode" />
      </el-form-item>
      <el-form-item :label="$t('settings.language')">
        <el-select v-model="language">
          <el-option
            v-for="lang in languages"
            :key="lang.value"
            :label="lang.label"
            :value="lang.value"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="saveSettings">
        {{ $t('settings.save') }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import message from '@/utils/message.js';

const { t } = useI18n();
const { success } = message;

const darkMode = ref(false);
const language = ref('zh-CN');
const languages = ref([
  { value: 'zh-CN', label: t('settings.chinese') },
  { value: 'en-US', label: t('settings.english') },
]);

const saveSettings = () => {
  success(t('settings.saveSuccess'));
};
</script>

<style lang="scss" scoped>
.settings {
  padding: 20px;
  h1 {
    color: var(--primary);
    margin-bottom: 20px;
  }
}
</style>
