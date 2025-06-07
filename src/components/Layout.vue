<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
    <div class="min-h-screen bg-base-200">
        <Header />

        <!-- 内容区域 -->
        <div class="container mx-auto p-4 mb-10 relative">

            <router-view v-slot="{ Component }">
                <transition 
                    appear 
                    mode="out-in"
                    name="fade" 
                    >
                <!-- <transition 
                    mode="out-in"
                      enter-active-class="animate__animated animate__flipInY"
  leave-active-class="animate__animated animate__flipOutY"
                    > -->
                    <keep-alive :include="['Home', 'Topics', 'Discover', 'Settings', 'Profile']" :max="6">
                        <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>

        <Footer />
    </div>
</template> 

<style scoped>
/* 基础淡入淡出效果 */
/* .fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-out;
} */

/* 可选：添加滑动效果 */

.fade-enter-from {
    transform: translateX(-5em);
    opacity: 0;
}

.fade-leave-to {
    transform: translateX(5em);
    opacity: 0;
}

.fade-enter-active , .fade-leave-active{
    transition: all 0.4s ease;
}
</style>