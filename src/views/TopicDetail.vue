<script setup lang="ts">
import { ref, onActivated, computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/Home/PostList.vue'
import Pagination from '@/components/Home/Pagination.vue'
import BackTop from '@/components/Base/BackTop.vue'
import { getPostList } from '@/api'
import type { Post, PaginationData } from '@/types'

const route = useRoute()
const topicId = computed(() => route.params.id as string)
const isLoading = ref(false)

// 话题信息
const topicInfo = ref({
  id: topicId.value,
  title: '校园生活',
  description: '分享校园生活中的点点滴滴，包括学习、活动、社交等各方面的内容。',
  postCount: 128,
  followerCount: 256,
  isFollowed: false
})

// 帖子列表
const postList = ref<Post[]>([])

// 分页数据
const paginationData = ref<PaginationData>({
  pages: 1,
  total: 0,
  size: 10,
  current: 1
})

// 获取话题下的帖子
const fetchTopicPosts = async (pageNum: number = 1) => {
  isLoading.value = true
  
  try {
    const { data: { records, total, size, pages, current } } = await getPostList({
      pageNum,
      pageSize: 10,
      tag: topicId.value // 假设API支持按话题ID筛选
    })
    
    postList.value = records
    paginationData.value = {
      total,
      pages,
      size,
      current
    }
  } catch (error) {
    console.error('获取话题帖子失败:', error)
    // 模拟数据
    postList.value = Array(5).fill(null).map((_, index) => ({
      id: `post-${index}`,
      title: `话题相关帖子 ${index + 1}`,
      authorId: 'user-1',
      authorName: '用户名',
      avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
      content: '这是帖子内容摘要...',
      tags: ['校园生活', '学习'],
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      images: '',
      looks: Math.floor(Math.random() * 500),
      isLiked: false
    }))
    
    paginationData.value = {
      total: 25,
      pages: 5,
      size: 10,
      current: 1
    }
  } finally {
    isLoading.value = false
  }
}

// 分页点击处理
const paginationClick = async (index: number) => {
  let targetPage = index
  
  if (index === -1) {
    // 上一页
    if (paginationData.value.current <= 1) return
    targetPage = paginationData.value.current - 1
  } else if (index === 9999) {
    // 下一页
    if (paginationData.value.current >= paginationData.value.pages) return
    targetPage = paginationData.value.current + 1
  }
  
  await fetchTopicPosts(targetPage)
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 关注/取消关注话题
const toggleFollow = () => {
  topicInfo.value.isFollowed = !topicInfo.value.isFollowed
  if (topicInfo.value.isFollowed) {
    topicInfo.value.followerCount++
  } else {
    topicInfo.value.followerCount--
  }
}

// 排序选项
const sortOptions = [
  { value: 'latest', label: '最新发布' },
  { value: 'popular', label: '最多点赞' },
  { value: 'comments', label: '最多评论' }
]
const currentSort = ref('latest')

onActivated(() => {
  fetchTopicPosts()
})
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- 话题头部 -->
    <div class="card bg-base-100 shadow-2xl rounded-xl mb-6">
      <div class="card-body p-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-3xl font-bold">{{ topicInfo.title }}</h1>
            <p class="text-base-content/70 mt-2">{{ topicInfo.description }}</p>
            
            <div class="flex items-center gap-6 mt-4">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>{{ topicInfo.postCount }} 篇帖子</span>
              </div>
              
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>{{ topicInfo.followerCount }} 位关注者</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button 
              @click="toggleFollow"
              class="btn"
              :class="topicInfo.isFollowed ? 'btn-outline' : 'btn-primary'"
            >
              {{ topicInfo.isFollowed ? '已关注' : '+ 关注话题' }}
            </button>
            
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>分享话题</a></li>
                <li><a>举报话题</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 筛选栏 -->
    <div class="bg-base-200 rounded-lg p-4 mb-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">排序方式:</span>
          <select v-model="currentSort" class="select select-sm select-bordered">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <button class="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            发布新帖子
          </button>
        </div>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
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
          <button class="btn btn-primary mt-4">发布新帖子</button>
        </div>
      </div>
      
      <PostList v-else :postList="postList" />
      
      <!-- 分页 -->
      <Pagination 
        v-if="paginationData.total > 0" 
        :paginationData="paginationData" 
        @pagination-click="paginationClick" 
      />
    </div>
    
    <BackTop />
  </div>
</template> 