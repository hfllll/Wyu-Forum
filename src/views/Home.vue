<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import LeftTabs from '@/components/Home/LeftTabs.vue';
import FilterBox from '@/components/Home/FilterBox.vue';
import PostList from '@/components/Home/PostList.vue';
import Pagination from '@/components/Home/Pagination.vue';
import { getPostCategory, getPostList, getTrendingTopic } from '@/api';
import type { Post, PostCategory, TrendingTopic, PaginationData } from '@/types';

const postList = ref<Post[]>([])
const categoryList = ref<PostCategory[]>([])
const topicList = ref<TrendingTopic[]>([])

const paginationData = reactive<PaginationData>({
  index: 1,
  total: 1,
  size: 10
})

// const fetchPostList = async () => {

//   try{
//     const { data: { records } } = await getPostList({
//       pageNum: 1,
//       pageSize: 10 
//     })
//     console.log('records', records);
//     postList.value = records

//   }catch(err) {
//     console.log('出现错误ERROR：', err);
//   }

// }

const fetchPostList = async (num = 1, size = 10) => {
  paginationData.index = num
  try{
    const { data: { records, total } } = await getPostList({
      pageNum: num,
      pageSize: size
    })
    postList.value = records
    paginationData.total = total
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

onMounted(() => {
  fetchPostList()
  fetchCategory()
  fetchTopic()
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
        <div class="space-y-4">
          <PostList :postList="postList" />
        </div>

        <!-- 分页 -->
        <Pagination :paginationData="paginationData" />
      </div>
    </div>
  </div>
</template>

