import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('../views/Projects.vue'),
      },
      {
        path: '/services/:type',
        name: 'services',
        component: () => import('../views/Services.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactPage.vue'),
      },
    ],
  })
}