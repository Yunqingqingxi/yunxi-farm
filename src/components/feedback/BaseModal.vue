<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    @close="handleClose"
    @closed="handleClosed"
    @open="handleOpen"
    @opened="handleOpened"
  >
    <slot></slot>
    <template #footer v-if="showFooter">
      <slot name="footer">
        <el-button @click="handleCancel">{{ cancelText }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ confirmText }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: String,
  width: {
    type: String,
    default: '50%',
  },
  fullscreen: Boolean,
  top: {
    type: String,
    default: '15vh',
  },
  modal: {
    type: Boolean,
    default: true,
  },
  appendToBody: Boolean,
  lockScroll: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
});

const emit = defineEmits([
  'update:visible',
  'close',
  'closed',
  'open',
  'opened',
  'cancel',
  'confirm',
]);

const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};

const handleClosed = () => {
  emit('closed');
};

const handleOpen = () => {
  emit('open');
};

const handleOpened = () => {
  emit('opened');
};

const handleCancel = () => {
  emit('cancel');
  handleClose();
};

const handleConfirm = () => {
  emit('confirm');
};
</script>

<style lang="scss" scoped>
.el-dialog {
  background-color: var(--el-bg-color);
  color: var(--el-text-color-primary);

  .el-dialog__header {
    color: var(--el-text-color-primary);
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .el-dialog__body {
    padding: 10px 20px;
    color: var(--el-text-color-regular);
  }

  .el-dialog__footer {
    border-top: 1px solid var(--el-border-color-light);
  }
}

.el-button {
  &:not(.is-plain) {
    background-color: var(--el-button-bg-color);
    border-color: var(--el-button-border-color);
  }
}
</style>
