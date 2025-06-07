import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const Home = () => import( /* webpackPreload: true */'@/views/Home.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
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
    { path: '/topic/:id', name: 'TopicDetail' ,component: () => import('@/views/TopicDetail.vue') },
    { path: '/discover', name: 'Discover' , component: () => import('@/views/Discover.vue') },
    { path: '/post/:id', name: 'Post' , component: () => import('@/views/PostDetail.vue') },
    { path: '/register' , name: 'Register' , component: () => import('@/views/Register.vue') },
    { path: '/forgot', name: 'Forgot' ,component: () => import('@/views/ForgotPassword.vue') },
    { path: '/create', name: 'Create' ,component: () => import('@/views/CreatePost.vue') },
    { path: '/settings', name: 'Settings' ,component: () => import('@/views/Settings.vue') },
    { path: '/profile/:id', name: 'ProfileWithId' ,component: () => import('@/views/Profile.vue') },
    { path: '/profile', name: 'Profile' ,component: () => import('@/views/Profile.vue') },
    { path: '/search', name: 'Search' ,component: () => import('@/views/SearchResults.vue') },
    // { path: '/:pathMatch(.*)*', name: 'NotFound' ,component: () => import('@/views/404.vue') },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/404.vue')}
  ],
})

// 只有特地页面才需要登录
const needLogin = ['/create', '/settings', '/profile', '/post']
// const needLogin = ['/create', '/settings', ]
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  if (needLogin.includes(to.path)) {
    if (!userStore.isLoggedIn) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router

