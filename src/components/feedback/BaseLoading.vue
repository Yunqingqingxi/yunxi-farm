<template>
  <div class="base-loading" :style="{ height: fullscreen ? '100vh' : '100%' }">
    <el-loading
      v-loading="loading"
      :element-loading-text="text"
      :element-loading-spinner="spinner"
      :element-loading-background="background"
      :element-loading-svg-view-box="svgViewBox"
      :element-loading-svg="svg"
      :element-loading-fullscreen="fullscreen"
    />
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    default: '加载中...',
  },
  spinner: String,
  background: String,
  svgViewBox: String,
  svg: String,
  fullscreen: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.base-loading {
  position: relative;
  width: 100%;

  :deep(.el-loading-mask) {
    background-color: var(--el-bg-color-overlay);

    .el-loading-spinner {
      .el-loading-text {
        color: var(--el-text-color-regular);
      }

      .circular {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
