import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, 'VITE_');

  return {
    plugins: [vue()],
    define: {
      'import.meta.env': {
        MODE: JSON.stringify(mode),
        VITE_APP_ENV: JSON.stringify(env.VITE_APP_ENV),
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL),
      },
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        },
      },
    },
  };
});
