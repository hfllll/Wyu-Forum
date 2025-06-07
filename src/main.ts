import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/routers'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores'
import { initTheme } from '@/utils/theme'

// 初始化主题
initTheme()

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
// 回复用户信息
const userStore = useUserStore()
userStore.initUserInfo()

app
  .use(router)
  .mount('#app')
