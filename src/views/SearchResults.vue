<script setup lang="ts">
import { ref, onActivated, computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/Home/PostList.vue'
import Pagination from '@/components/Home/Pagination.vue'
import BackTop from '@/components/Base/BackTop.vue'
import { getPostList } from '@/api'
import type { Post, PaginationData } from '@/types'

const route = useRoute()
const keyword = computed(() => route.query.keyword as string || '')

const postList = ref<Post[]>([])
const isLoading = ref(false)
const noResults = ref(false)

const paginationData = ref<PaginationData>({
  pages: 1,
  total: 0,
  size: 10,
  current: 1
})

// 获取搜索结果
const fetchSearchResults = async (pageNum: number = 1) => {
  if (!keyword.value) return
  
  isLoading.value = true
  noResults.value = false
  
  try {
    const { data: { records, total, size, pages, current } } = await getPostList({
      pageNum,
      pageSize: 10,
      keyword: keyword.value
    })
    
    postList.value = records
    paginationData.value = {
      total,
      pages,
      size,
      current
    }
    
    noResults.value = records.length === 0
  } catch (error) {
    console.error('搜索失败:', error)
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
  
  await fetchSearchResults(targetPage)
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 过滤选项
const sortOptions = [
  { value: 'latest', label: '最新发布' },
  { value: 'popular', label: '最多点赞' },
  { value: 'comments', label: '最多评论' }
]
const currentSort = ref('latest')

onActivated(() => {
  fetchSearchResults()
})
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- 搜索结果头部 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold flex items-center gap-2">
        <span>搜索结果</span>
        <span v-if="keyword" class="text-primary">"{{ keyword }}"</span>
      </h1>
      <p v-if="!isLoading && !noResults" class="text-base-content/70">
        找到 {{ paginationData.total }} 条相关结果
      </p>
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
          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <span class="label-text">只看有图片</span> 
              <input type="checkbox" class="toggle toggle-primary toggle-sm" />
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
    
    <!-- 无结果状态 -->
    <div v-else-if="noResults" class="card bg-base-100 shadow-lg p-8 text-center">
      <div class="flex flex-col items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-bold">未找到相关结果</h3>
        <p class="text-base-content/70">
          没有找到与"{{ keyword }}"相关的内容，请尝试其他关键词
        </p>
        <button class="btn btn-primary mt-4">返回首页</button>
      </div>
    </div>
    
    <!-- 搜索结果列表 -->
    <div v-else class="space-y-4">
      <PostList :postList="postList" />
      
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