<script setup lang="ts">
import { ref } from 'vue'

const activities = ref([
  {
    id: 1,
    title: '校园摄影大赛',
    organizer: '摄影协会',
    date: '2024-05-15',
    location: '大学生活动中心',
    image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
    participants: 68
  },
  {
    id: 2,
    title: '程序设计竞赛',
    organizer: '计算机学院',
    date: '2024-05-20',
    location: '计算机楼102室',
    image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
    participants: 125
  },
  {
    id: 3,
    title: '大学生创业论坛',
    organizer: '创业协会',
    date: '2024-05-25',
    location: '图书馆报告厅',
    image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
    participants: 93
  },
  {
    id: 4,
    title: '校园歌手大赛',
    organizer: '音乐协会',
    date: '2024-06-01',
    location: '大学生活动中心',
    image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
    participants: 45
  }
])

const recommendations = ref([
  {
    id: 1,
    title: '如何制定高效的学习计划？',
    author: '学习达人',
    likes: 154,
    views: 3256
  },
  {
    id: 2,
    title: '大学生必备的10个实用技能',
    author: '职场咨询师',
    likes: 128,
    views: 2789
  },
  {
    id: 3,
    title: '校园兼职经验分享与注意事项',
    author: '兼职达人',
    likes: 109,
    views: 2453
  }
])
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">发现</h1>
      <p class="text-base-content/70">探索校园活动和精彩内容</p>
    </div>
    
    <!-- 校园活动 -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">校园活动</h2>
        <button class="btn btn-sm btn-link">查看全部</button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="activity in activities" :key="activity.id" class="card bg-base-100 shadow-lg">
          <figure><img :src="activity.image" alt="活动图片" class="h-48 w-full object-cover" /></figure>
          <div class="card-body">
            <h2 class="card-title">{{ activity.title }}</h2>
            <div class="flex flex-col gap-1 text-sm">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ activity.date }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ activity.location }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{{ activity.participants }} 人参与</span>
              </div>
            </div>
            <div class="card-actions justify-end mt-2">
              <button class="btn btn-primary btn-sm">参加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 精选推荐 -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">精选推荐</h2>
        <button class="btn btn-sm btn-link">更多推荐</button>
      </div>
      
      <div class="space-y-4">
        <div v-for="item in recommendations" :key="item.id" class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="text-base-content/70">作者：{{ item.author }}</p>
            <div class="card-actions justify-between mt-2">
              <div class="flex items-center gap-4 text-sm text-base-content/70">
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ item.likes }}
                </span>
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ item.views }}
                </span>
              </div>
              <button class="btn btn-outline btn-sm">查看</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 下载应用提示 -->
    <div class="card bg-primary text-primary-content shadow-xl">
      <div class="card-body">
        <h2 class="card-title">下载WYU论坛APP</h2>
        <p>随时随地浏览精彩内容，不错过任何校园动态</p>
        <div class="card-actions justify-end">
          <button class="btn">立即下载</button>
        </div>
      </div>
    </div>
  </div>
</template> 