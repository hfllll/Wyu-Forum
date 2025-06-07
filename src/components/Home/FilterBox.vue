<script setup lang="ts">
import { reactive, defineEmits, ref } from 'vue';

interface FilterEmit {
    (e: 'filter-change', filter: 0 | 1 | 2): void;
    (e: 'layout-change', layout: 'list' | 'grid'): void;
}

const emit = defineEmits<FilterEmit>();

// 添加布局状态
const currentLayout = ref<'list' | 'grid'>('list');

type Tab = {
    name: string,
    active: boolean
}

const tabs = reactive<Tab[]>([
    {
        name: '最新',
        active: true
    },
    {
        name: '热门',
        active: false
    },
    {
        name: '推荐',
        active: false
    }
])

const handleTabClick = (index: 0 | 1 | 2 = 0) => {
    tabs[index].active = true
    tabs.forEach((t, i) => {
        if (i !== index) {
            t.active = false
        }
    })
    emit('filter-change', index)
}

// 添加布局切换函数
const toggleLayout = (layout: 'list' | 'grid') => {
    currentLayout.value = layout;
    emit('layout-change', layout);
}
</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <div class="tabs tabs-boxed" >
            <button class="tab" v-for="(tab, index) in tabs" :key="tab.name" :class="{ 'tab-active': tab.active }" @click="handleTabClick(index as 0 | 1 | 2)" >{{ tab.name }}</button>
        </div>
        <div class="join hidden sm:block">
            <button class="join-item btn btn-sm" :class="{ 'btn-active': currentLayout === 'list' }" @click="toggleLayout('list')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <button class="join-item btn btn-sm" :class="{ 'btn-active': currentLayout === 'grid' }" @click="toggleLayout('grid')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
            </button>
        </div>
    </div>
</template>