<template>
  <div v-if="isLoggedIn">
    <el-dropdown trigger="hover">
      <div class="user-dropdown">
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span class="username">{{ userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><User /></el-icon>
            <span>{{ $t('user.menu.profile') }}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Setting /></el-icon>
            <span>{{ $t('user.menu.settings') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            <span>{{ $t('user.menu.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-button v-else type="primary" @click="goToLogin">
    {{ $t('user.login') }}
  </el-button>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { User, Setting, SwitchButton } from '@element-plus/icons-vue';

const router = useRouter();
const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);
const userName = computed(() => userStore.userInfo?.name || $t('user.guest'));

const goToLogin = () => {
  router.push('/auth');
};

const handleLogout = () => {
  userStore.logout();
  router.push('/auth');
};
</script>

<style lang="scss" scoped>
.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: white;

  .username {
    font-size: 14px;
  }
}
</style>
