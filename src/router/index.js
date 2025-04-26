import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Settings from '@/views/system/Settings.vue';
import User from '@/views/user/User.vue';
import NotFound from '@/views/NotFound.vue';
import Auth from '@/views/user/Auth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      title: 'auth',
      requiresAuth: false,
      noLayout: true,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      noLayout: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
