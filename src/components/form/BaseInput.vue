<template>
  <el-form-item :label="label" :prop="prop">
    <el-input
      :model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :clearable="clearable"
      :show-password="showPassword"
      :disabled="disabled"
      @input="handleInput"
      @change="handleChange"
    />
  </el-form-item>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: String,
  prop: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  clearable: Boolean,
  showPassword: Boolean,
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue', 'input', 'change']);

const handleInput = value => {
  emit('update:modelValue', value);
  emit('input', value);
};

const handleChange = value => {
  emit('change', value);
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 18px;

  :deep(.el-input__wrapper) {
    background-color: var(--el-bg-color);
    color: var(--el-text-color-regular);
    border-color: var(--el-border-color);
  }

  :deep(.el-input__inner) {
    color: var(--el-text-color-regular);
  }
}
</style>
