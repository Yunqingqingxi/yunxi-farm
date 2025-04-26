<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="not-found-content">
        <div class="not-found-image">
          <img src="@/assets/images/404-illustration.svg" alt="404 Illustration" />
        </div>
        <div class="not-found-text">
          <h1>{{ $t('notFound.title') }}</h1>
          <h2>{{ $t('notFound.subtitle') }}</h2>
          <p>{{ $t('notFound.description') }}</p>
          <div class="not-found-actions">
            <CustomButton type="primary" @click="goHome">{{
              $t('notFound.homeButton')
            }}</CustomButton>
            <CustomButton @click="goBack">{{ $t('notFound.backButton') }}</CustomButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import CustomButton from '@/components/form/CustomButton.vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.not-found-page {
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  color: var(--text);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.not-found-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.not-found-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 4rem;
}

.not-found-image {
  flex: 1;
  max-width: 600px;

  img {
    width: 100%;
    height: auto;
  }
}

.not-found-text {
  flex: 1;
  text-align: left;

  h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
    color: var(--el-color-primary);
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--el-text-color-primary);
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    color: var(--el-text-color-regular);
  }
}

.not-found-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .not-found-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .not-found-text {
    text-align: center;
  }
}
</style>
