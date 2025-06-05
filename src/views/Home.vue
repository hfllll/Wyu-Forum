<script setup lang="ts">
import { onActivated,  nextTick ,reactive, ref } from 'vue'
import LeftTabs from '@/components/Home/LeftTabs.vue';
import FilterBox from '@/components/Home/FilterBox.vue';
import PostList from '@/components/Home/PostList.vue';
import Pagination from '@/components/Home/Pagination.vue';
import BackTop from '@/components/Base/BackTop.vue';
import { getPostCategory, getPostList, getTrendingTopic } from '@/api';
import type { Post, PostCategory, TrendingTopic, PaginationData } from '@/types';

const postList = ref<Post[]>([])
const categoryList = ref<PostCategory[]>([])
const topicList = ref<TrendingTopic[]>([])

const paginationData = reactive<PaginationData>({
  pages: 1,
  total: 1,
  size: 10,
  current: 1
})

const fetchPostList = async (num:number = 1, pageSize: number = 10) => {
  try{
    const { data: { records, total, size, pages, current } } = await getPostList({
      pageNum: num,
      pageSize: pageSize
    })
    postList.value = records
    paginationData.total = total
    paginationData.pages = pages
    paginationData.size = size
    paginationData.current = current

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

  // 获取数据
  await fetchPostList(targetPage);
  // 等待 DOM 更新
  await nextTick();
  // 检查页面是否可滚动
  if (document.documentElement.scrollHeight > window.innerHeight + 50) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onActivated(async () => {
  await Promise.all([fetchPostList(), fetchCategory(), fetchTopic()]);
})

</script>

<template>
  <div>
    <!-- 论坛主页内容区 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 左侧边栏 -->
      <LeftTabs :category-list="categoryList" :topic-list="topicList"/>

      <!-- 主内容区 -->
      <div class="md:col-span-3">
        <!-- 筛选栏 -->
        <FilterBox />

        <!-- 帖子列表 -->
        <div class="space-y-4 ">
          <PostList :postList="postList" />
        </div>

        <!-- 分页 -->
        <Pagination :paginationData="paginationData" @pagination-click="paginationClick" />
      </div>

      <BackTop />
    </div>
  </div>
</template>

