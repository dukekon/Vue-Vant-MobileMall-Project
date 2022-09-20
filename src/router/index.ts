import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/home/search',
          name: 'search',
          component: () => import('@/views/search/SearchView.vue'),
        },
      ],
      meta: {
        showTabbar: true,
      },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/UserView.vue'),
      children: [
        {
          path: '/user/login',
          name: 'login',
          component: () => import('@/views/login/LoginView.vue'),
          meta: {
            showTabbar: false,
          },
        },
      ],
      meta: {
        showTabbar: true,
      },
    },
  ],
})

export default router
