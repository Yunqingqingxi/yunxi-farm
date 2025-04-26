<template>
  <template v-if="$route.meta.noLayout">
    <router-view />
  </template>
  <template v-else>
    <BaseLayout>
      <template #header>
        <div class="header-content">
          <div class="header-left">
            <div class="logo">
              <span class="logo-text">{{ $t('app.title') }}</span>
            </div>
          </div>

          <div class="header-center">
            <nav class="nav-menu">
              <ul>
                <li>
                  <router-link to="/">{{ $t('menu.home') }}</router-link>
                </li>
                <li>
                  <router-link to="/dashboard">{{ $t('menu.dashboard') }}</router-link>
                </li>
                <li>
                  <router-link to="/about">{{ $t('menu.about') }}</router-link>
                </li>
              </ul>
            </nav>
          </div>

          <div class="header-right">
            <ThemeSwitch class="header-action" />
            <LanguageSwitch class="header-action" />
            <UserDropdown class="header-action" />
          </div>
        </div>
      </template>

      <router-view />

      <template #footer>
        <div class="footer-content">
          <p>{{ $t('app.copyright') }}</p>
        </div>
      </template>
    </BaseLayout>
  </template>
</template>

<script setup>
import BaseLayout from '@/components/layout/BaseLayout.vue';
import ThemeSwitch from '@/components/feedback/ThemeSwitch.vue';
import LanguageSwitch from '@/components/feedback/LanguageSwitch.vue';
import UserDropdown from '@/components/feedback/UserDropdown.vue';
</script>

<style lang="scss" scoped></style>
