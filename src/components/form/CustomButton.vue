<template>
  <el-button
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :disabled="disabled"
    :loading="loading"
    @click="handleClick"
  >
    <slot>{{ $t(text) }}</slot>
  </el-button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'default',
  },
  text: {
    type: String,
    default: '',
  },
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  disabled: Boolean,
  loading: Boolean,
});

const emit = defineEmits(['click']);

const handleClick = e => {
  emit('click', e);
};
</script>

<style lang="scss">
.el-button {
  margin: 4px;
  width: 100%;
  max-width: 400px;

  &:not(.is-plain) {
    background-color: var(--el-button-bg-color);
    border-color: var(--el-button-border-color);
    color: var(--el-button-text-color);

    &:hover {
      background-color: var(--el-button-hover-bg-color);
      border-color: var(--el-button-hover-border-color);
    }

    &:active {
      background-color: var(--el-button-active-bg-color);
      border-color: var(--el-button-active-border-color);
    }
  }

  &.is-plain {
    color: var(--el-button-text-color);
    border-color: var(--el-button-border-color);

    &:hover {
      color: var(--el-button-hover-text-color);
      border-color: var(--el-button-hover-border-color);
    }
  }
}
</style>
