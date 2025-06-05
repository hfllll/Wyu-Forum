import { createRouter, createWebHistory } from 'vue-router'
// import { useLoadingStore } from '@/stores'

const Home = () => import( /* webpackPreload: true */'@/views/Home.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior( ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 300)
    })
  },
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login' ,component: () => import('@/views/Login.vue') },
    { path: '/topics', name: 'Topics' ,component: () => import('@/views/Topics.vue') },
    { path: '/discover', name: 'Discover' , component: () => import('@/views/Discover.vue') },
    { path: '/post/:id', name: 'Post' , component: () => import('@/views/PostDetail.vue') },
    { path: '/register' , name: 'Register' , component: () => import('@/views/Register.vue') },
    { path: '/forgot', name: 'Forgot' ,component: () => import('@/views/ForgotPassword.vue') },
  ],

  
})


export default router

