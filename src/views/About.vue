<template>
  <div class="about">
    <h1>关于我们</h1>
    <el-button type="success" @click="showConfirm">测试确认框</el-button>
  </div>
</template>

<script setup>
import message from '@/utils/message.js';

const { confirm } = message;

const showConfirm = () => {
  confirm('确认提示', '确定要执行此操作吗？')
    .then(() => {
      // 用户点击确定
    })
    .catch(() => {
      // 用户点击取消
    });
};
</script>

<style lang="scss" scoped>
.about {
  padding: 20px;
  h1 {
    color: var(--secondary);
    margin-bottom: 20px;
  }
}
</style>
