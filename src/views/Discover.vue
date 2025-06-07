<script setup lang="ts">
import { onActivated,  ref } from 'vue'
import type { Activity, Recommendations } from '@/types'
import ActivityList from '@/components/Discover/ActivityList.vue'
import RecommendationList from '@/components/Discover/RecommendationList.vue'
import { getActivity, getRecommend } from '@/api'
const activities = ref<Activity[]>([])

const recommendations = ref<Recommendations[]>([])

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