<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// activeTab变量已在模板中使用
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <Header />
        
        <!-- 内容区域 -->
        <div class="container mx-auto p-4 mb-10">
            <router-view v-slot="{ Component }">
                <transition 
                    appear 
                    mode="out-in"
                    name="fade" >
                    <keep-alive :max="6">
                        <component  :is="Component" />
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
    transition: all 0.5s ease;
}
</style>