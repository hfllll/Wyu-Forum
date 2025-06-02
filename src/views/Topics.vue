<script setup lang="ts">
import TopicList from '@/components/Topic/TopicList.vue'
import TopicSearch from '@/components/Topic/TopicSearch.vue'
import { onActivated, ref } from 'vue';
import { getTopic } from '@/api/modules/topic';
import type { Topic } from '@/types';

const topicList = ref<Topic[]>([])

const fetchTopicList = async () => {
 const { data } = await getTopic()
 topicList.value = data
}
onActivated(async () => {
  await fetchTopicList()
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">话题广场</h1>
      <p class="text-base-content/70">发现感兴趣的话题，加入讨论</p>
    </div>
    
    <!-- 搜索框 -->
    <TopicSearch />
    
    <TopicList :topic-list='topicList' />
    
    <!-- 创建话题按钮 -->
    <div class="fixed bottom-8 right-8">
      <button class="btn btn-primary btn-circle btn-lg shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  </div>
</template> 