<template>
  <el-card class="base-card" :header="header" :shadow="shadow" :body-style="bodyStyle">
    <template #header v-if="$slots.header || header">
      <div class="card-header">
        <slot name="header">{{ header }}</slot>
        <div class="card-actions" v-if="$slots.actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </template>

    <slot></slot>
  </el-card>
</template>

<script setup>
defineProps({
  header: String,
  shadow: {
    type: String,
    default: 'hover',
  },
  bodyStyle: {
    type: Object,
    default: () => ({ padding: '20px' }),
  },
});
</script>

<style lang="scss" scoped>
.base-card {
  margin-bottom: 20px;
  background-color: var(--el-bg-color);
  border-color: var(--el-border-color-light);
  color: var(--el-text-color-primary);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--el-text-color-primary);
    border-bottom: 1px solid var(--el-border-color-light);

    .card-actions {
      display: flex;
      gap: 8px;
    }
  }

  :deep(.el-card__body) {
    color: var(--el-text-color-regular);
  }
}
</style>
