import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/login', component: () => import('@/views/Login.vue') },
    { path: '/topics', component: () => import('@/views/Topics.vue') },
    { path: '/discover', component: () => import('@/views/Discover.vue') },
    { path: '/post/:id', component: () => import('@/views/PostDetail.vue') },
  ],
})

export default router

