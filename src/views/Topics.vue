<script setup lang="ts">
import TopicList from '@/components/Topic/TopicList.vue'
import TopicSearch from '@/components/Topic/TopicSearch.vue'
import { ref } from 'vue';
import { getTopic } from '@/api';
import type { Topic } from '@/types';
import Swal from 'sweetalert2';
import { onMounted } from 'vue';

const topicList = ref<Topic[]>([])

const isEmpty = ref<boolean>(false)

const fetchTopicList = async () => {
 const { data } = await getTopic()
 topicList.value = data
}

const handleSearch = async (keyword: string) => {
  const { data } = await getTopic({ keyword })
  topicList.value = data
  isEmpty.value = data.length === 0
}

const createTopic = () => {
  Swal.fire({
    title: '警告！',
    icon: 'error',
    text: '你没有权限创建话题',
    confirmButtonText: '确定  ',
    showCancelButton: true,
    cancelButtonText: '取消',
    allowOutsideClick: false,
    showConfirmButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  })
}

onMounted( () => { 
  fetchTopicList()
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">话题广场</h1>
      <p class="text-base-content/70">发现感兴趣的话题，加入讨论</p>
    </div>
    
    <!-- 搜索框 -->
    <TopicSearch @search="handleSearch" />
    
    <!-- 空状态 -->
    <div v-if="isEmpty" class="card bg-base-100 shadow-xl p-12 text-center"> 
      <div class="flex flex-col items-center gap-4">
        <!-- 空状态图标 -->
        <div class="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <!-- 空状态文本 -->
        <div class="space-y-2">
          <h3 class="text-xl font-bold">未找到相关话题</h3>
          <p class="text-base-content/70">换个关键词试试，或者创建一个新话题</p>
        </div>
        
        <!-- 创建话题按钮 -->
        <button class="btn btn-primary mt-4" @click="createTopic">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          创建新话题
        </button>
      </div>
    </div>

    <TopicList v-else :topic-list='topicList' />
    
    <!-- 创建话题按钮 -->
    <div class="fixed bottom-8 right-8">
      <button class="btn btn-primary btn-circle btn-lg shadow-lg" @click="createTopic">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  </div>
</template> 