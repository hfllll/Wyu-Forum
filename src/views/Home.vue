<script setup lang="ts">
import { onMounted } from 'vue'
import LeftTabs from '@/components/Home/LeftTabs.vue';
import FilterBox from '@/components/Home/FilterBox.vue';
import PostList from '@/components/Home/PostList.vue';
import Pagination from '@/components/Home/Pagination.vue';
import { getPostList } from '@/api';

const fetchPostList = async () => {
  const { data } = await getPostList({
    pageNum: 1,
    pageSize: 10 
  })
  console.log(data);
  
}

onMounted(() => {
  fetchPostList()
})

</script>

<template>
  <div>
    <!-- 论坛主页内容区 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 左侧边栏 -->
      <LeftTabs />

      <!-- 主内容区 -->
      <div class="md:col-span-3">
        <!-- 筛选栏 -->
        <FilterBox />

        <!-- 帖子列表 -->
        <div class="space-y-4">
          <PostList />
        </div>

        <!-- 分页 -->
        <Pagination />
      </div>
    </div>
  </div>
</template>

