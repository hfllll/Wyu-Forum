<script setup lang="ts">
import { onActivated,  nextTick ,reactive, ref } from 'vue'
import LeftTabs from '@/components/Home/LeftTabs.vue';
import FilterBox from '@/components/Home/FilterBox.vue';
import PostList from '@/components/Home/PostList.vue';
import Pagination from '@/components/Home/Pagination.vue';
import BackTop from '@/components/Base/BackTop.vue';
import { getPostCategory, getTrendingTopic, debouncedGetPostList } from '@/api';
import type { Post, PostCategory, TrendingTopic, PaginationData, PostsParams } from '@/types';
import router from '@/routers';
import { debounce } from 'lodash';
const postList = ref<Post[]>([])
const categoryList = ref<PostCategory[]>([])
const topicList = ref<TrendingTopic[]>([])
const isEmpty = ref<boolean>(false)

const paginationData = reactive<PaginationData>({
  pages: 1,
  total: 1,
  size: 10,
  current: 1
})

const postlistParams = reactive<PostsParams>({
  pageNum: 1, 
  pageSize : 10, 
  sortId : 0
})



const fetchPostList = async () => {
  isEmpty.value = false
  postList.value = []
  try{
    const { data: { records, total, size, pages, current } } = await debouncedGetPostList.immediate(postlistParams)
    postList.value = records
    paginationData.total = total
    paginationData.pages = pages
    paginationData.size = size
    paginationData.current = current
    if (!records.length) {
      isEmpty.value = true
    }
  }catch(err) {
    console.log('出现错误ERROR：', err);
  }
}

const fetchCategory = async () => {

  try{
    const { data } = await getPostCategory()
    categoryList.value = data

  }catch(err) {
    console.log('出现错误ERROR：', err);
  }
}

const fetchTopic = async () => {
  try{
    const { data } = await getTrendingTopic() 
    topicList.value = data
  }catch(err){
    console.log('出现错误ERROR：', err);
  }
}

const paginationClick = async (index: number) => {
  let targetPage = index;
  if (index === -1) {
    if (paginationData.current <= 1) return;
    targetPage = paginationData.current - 1;
  } else if (index === 9999) {
    if (paginationData.current >= paginationData.pages) return;
    targetPage = paginationData.current + 1;
  }

  postlistParams.pageNum = targetPage

  // 获取数据
  await fetchPostList();
  // 等待 DOM 更新
  await nextTick();
  // 检查页面是否可滚动
  if (document.documentElement.scrollHeight > window.innerHeight + 50) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleFilterChange = async (filter: 0 | 1 | 2 = 0) => {
  postlistParams.sortId = filter
  await fetchPostList()
}

const handleCategoryChange = async (catId: string) => {
  postlistParams.labelId = catId
  await fetchPostList()
}

onActivated(async () => {
  await Promise.all([fetchPostList(), fetchCategory(), fetchTopic()]);
})
</script>

<template>
  <div>
    <!-- 论坛主页内容区 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 左侧边栏 -->
      <LeftTabs :category-list="categoryList" :topic-list="topicList" @category-change="handleCategoryChange" />

      <!-- 主内容区 -->
      <div class="md:col-span-3">
        <!-- 筛选栏 -->
        <FilterBox @filter-change="handleFilterChange" />

        <!-- 帖子列表 -->
        <div class="space-y-4 ">
          <div v-show="isEmpty" class="hero min-h-screen"
            style="background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);">
            <div class="hero-overlay"></div>
            <div class="hero-content text-neutral-content text-center">
              <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">Post There</h1>
                <p class="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                  quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <button class="btn btn-primary" @click="router.push('/create')">Get Started</button>
              </div>
            </div>
          </div>
          <!-- 加载动画 -->
          <PostList v-show="!isEmpty" :postList="postList" />
        </div>

        <!-- 分页 -->
        <Pagination :paginationData="paginationData" @pagination-click="paginationClick" />
      </div>

      <BackTop />
    </div>
  </div>
</template>

