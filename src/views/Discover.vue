<script setup lang="ts">
import { onActivated,  ref } from 'vue'
import type { Activity, Recommendations } from '@/types'
import ActivityList from '@/components/Discover/ActivityList.vue'
import RecommendationList from '@/components/Discover/RecommendationList.vue'
import { getActivity, getRecommend } from '@/api'
const activities = ref<Activity[]>([
  // {
  //   id: '1',
  //   title: '校园摄影大赛',
  //   date: '2024-05-15',
  //   location: '大学生活动中心',
  //   image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  //   participants: 68
  // },
  // {
  //   id: '2',
  //   title: '程序设计竞赛',
  //   date: '2024-05-20',
  //   location: '计算机楼102室',
  //   image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  //   participants: 125
  // },
  // {
  //   id: '3',
  //   title: '大学生创业论坛',
  //   date: '2024-05-25',
  //   location: '图书馆报告厅',
  //   image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  //   participants: 93
  // },
  // {
  //   id: '4',
  //   title: '校园歌手大赛',
  //   date: '2024-06-01',
  //   location: '大学生活动中心',
  //   image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  //   participants: 45
  // }
])

const recommendations = ref<Recommendations[]>([
  // {
  //   id: '1',
  //   title: '如何制定高效的学习计划？',
  //   authorName: '学习达人',
  //   likes: 154,
  //   looks: 3256
  // },
  // {
  //   id: '2',
  //   title: '大学生必备的10个实用技能',
  //   authorName: '职场咨询师',
  //   likes: 128,
  //   looks: 2789
  // },
  // {
  //   id: '3',
  //   title: '校园兼职经验分享与注意事项',
  //   authorName: '兼职达人',
  //   likes: 109,
  //   looks: 2453
  // }
])

const fetchActivity = async() =>{
  const { data } = await getActivity()
  activities.value = data
}

const fetchRecommend = async() =>{
  const { data } = await getRecommend()
  recommendations.value = data
}

onActivated(async () => {
  await Promise.all([fetchActivity(), fetchRecommend()])
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">发现</h1>
      <p class="text-base-content/70">探索校园活动和精彩内容</p>
    </div>
    
    <!-- 校园活动 -->
    <ActivityList :activities="activities" />
    
    <!-- 精选推荐 -->
    <RecommendationList :recommendations="recommendations" />
    
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