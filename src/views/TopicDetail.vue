<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/Home/PostList.vue'
import BackTop from '@/components/Base/BackTop.vue'
import TopicDetailHeader from '@/components/Topic/TopicDetailHeader.vue'

import type { Post, Topic, PostsParams } from '@/types'
import { getPostList, getTopic } from '@/api'
import router from '@/routers'

interface Tabs {
  value: 0 | 1 | 2,
  label: string
}

const route = useRoute()
const topicId = route.params.id as string
const isLoading = ref(false)

// 话题信息
const topicInfo = ref<Topic | null>(null)

// 帖子列表
const postList = ref<Post[]>([])

// 帖子列表获取的数据
const postParams = reactive<PostsParams>({
  sortId: 0,
  pageNum: 1,
  pageSize: 8,
  topicId: topicId
})

// 获取话题下的帖子
const fetchTopicPosts = async () => {
  isLoading.value = true
  try{
    const [ topicData, postData ] = await Promise.all([
      getTopic({
        topicId: topicId
      }),
      getPostList(postParams)
    ])
    
    topicInfo.value = topicData.data[0]
    postList.value = postData.data.records
  }catch(err){
    console.error('获取话题帖子失败:', err)
  }finally{
    isLoading.value = false
  }
}

// 排序选项
const sortOptions:Tabs[] = [
  { value: 0, label: '最新发布' },
  { value: 1, label: '最高热度' },
  { value: 2, label: '最佳推荐' }
]
const currentSort = ref<0 | 1 | 2>(0)

// 监听排序方式变化，更新帖子列表
watch(currentSort, (newValue) => {
  handleSortChange(newValue)
})

// 处理排序方式变化
const handleSortChange = async (sortId: 0 | 1 | 2) => {
  // 更新排序参数
  postParams.sortId = sortId
  // 重置页码
  postParams.pageNum = 1
  // 重新获取帖子列表
  isLoading.value = true
  
  try {
    const { data } = await getPostList(postParams)
    postList.value = data.records
  } catch (err) {
    console.error('更新排序获取帖子失败:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTopicPosts()
})

</script>

<template>
  <div class="container mx-auto py-8 px-4">
    
    <TopicDetailHeader :topic-info="topicInfo" :topic-id="topicId" />

    <!-- 筛选栏 -->
    <div class="bg-base-200 rounded-lg p-4 mb-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">排序方式:</span>
          <select 
            v-model="currentSort" 
            class="select select-sm select-bordered"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <button class="btn btn-primary btn-sm" @click="router.push('/create')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            发布新帖子
          </button>
        </div>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center py-12 h-50">
      <span class="loading loading-spinner loading-lg text-primary "></span>
    </div>
    
    <!-- 帖子列表 -->
    <div v-else class="space-y-4">
      <div v-if="postList.length === 0" class="card bg-base-100 shadow-lg p-8 text-center">
        <div class="flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold">暂无帖子</h3>
          <p class="text-base-content/70">
            这个话题下还没有帖子，成为第一个发帖的人吧！
          </p>
          <button class="btn btn-primary mt-4" @click="router.push('/create')">发布新帖子</button>
        </div>
      </div>
      
      <PostList v-else :postList="postList" />

    </div>
    
    <BackTop />
  </div>
</template> 