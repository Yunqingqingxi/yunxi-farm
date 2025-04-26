<template>
  <div class="base-layout">
    <header class="layout-header" v-if="$slots.header">
      <slot name="header"></slot>
    </header>

    <main class="layout-main">
      <div class="main-content">
        <slot></slot>
      </div>
    </main>

    <footer class="layout-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  headerHeight: {
    type: String,
    default: '64px',
  },
  footerHeight: {
    type: String,
    default: '56px',
  },
  contentPadding: {
    type: String,
    default: '24px',
  },
});
</script>

<style lang="scss">
.base-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;

  .layout-header {
    flex: 0 0 auto;
    background: var(--header-bg);
    color: white;
    height: v-bind('props.headerHeight');
    box-shadow: var(--card-shadow);
    z-index: 10;

    .header-content {
      height: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-left {
        flex: 0 0 auto;
        .logo {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 1px;
        }
      }

      .header-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        .nav-menu ul {
          display: flex;
          gap: 30px;
          list-style: none;
          margin: 0;
          padding: 0;

          a {
            color: white;
            text-decoration: none;
            font-size: 16px;
            transition: opacity 0.2s;

            &:hover {
              opacity: 0.8;
            }

            &.router-link-active {
              font-weight: 500;
              border-bottom: 2px solid white;
            }
          }
        }
      }

      .header-right {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 20px;

        .header-action {
          cursor: pointer;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .layout-main {
    flex: 1;
    min-height: calc(100vh - v-bind('props.headerHeight') - v-bind('props.footerHeight'));
    background-color: var(--content-background);

    .main-content {
      height: 100%;
      width: 100%;
      padding: v-bind('props.contentPadding');
    }
  }

  .layout-footer {
    flex: 0 0 auto;
    background: var(--header-bg);
    color: rgba(255, 255, 255, 0.8);
    height: v-bind('props.footerHeight');

    .footer-content {
      height: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
}
</style>
