<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LeftTabs from '@/components/Home/LeftTabs.vue';
// activeTab变量已在模板中使用
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <Header />
        
        <!-- 内容区域 -->
        <div class="container mx-auto p-4">
            <router-view />
        </div>

        <Footer />
    </div>
</template> 