<script setup lang="ts">
import { ref } from 'vue'

const topics = ref([
  {
    id: 1,
    title: '编程技术',
    description: '讨论编程语言、框架和开发技巧',
    posts: 183,
    followers: 256
  },
  {
    id: 2,
    title: '校园生活',
    description: '分享校园趣事、活动和日常生活',
    posts: 145,
    followers: 198
  },
  {
    id: 3,
    title: '学习经验',
    description: '交流学习方法、考试技巧和学习资源',
    posts: 127,
    followers: 176
  },
  {
    id: 4,
    title: '实习就业',
    description: '分享实习经历、求职技巧和职场经验',
    posts: 98,
    followers: 153
  },
  {
    id: 5,
    title: '校园活动',
    description: '发布和讨论各类校园活动信息',
    posts: 87,
    followers: 121
  },
  {
    id: 6,
    title: '考研专区',
    description: '考研经验、资料分享和备考交流',
    posts: 76,
    followers: 110
  }
])
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">话题广场</h1>
      <p class="text-base-content/70">发现感兴趣的话题，加入讨论</p>
    </div>
    
    <!-- 搜索框 -->
    <div class="form-control mb-6">
      <div class="input-group">
        <input type="text" placeholder="搜索话题..." class="input input-bordered w-full" />
        <button class="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </div>
    
    <!-- 话题列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="topic in topics" :key="topic.id" class="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
        <div class="card-body">
          <h2 class="card-title text-primary">{{ topic.title }}</h2>
          <p>{{ topic.description }}</p>
          <div class="flex justify-between text-sm text-base-content/70 mt-2">
            <span>{{ topic.posts }} 帖子</span>
            <span>{{ topic.followers }} 关注</span>
          </div>
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-primary btn-sm">关注</button>
            <button class="btn btn-outline btn-sm">查看</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 创建话题按钮 -->
    <div class="fixed bottom-8 right-8">
      <button class="btn btn-primary btn-circle btn-lg shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  </div>
</template> 