<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import type { PostCategory, TrendingTopic } from '@/types'

export interface LeftTabProps {
  categoryList: PostCategory[],
  topicList: TrendingTopic[]
}

const selectedCategory = ref('1')


const props = defineProps<LeftTabProps>()

</script>

<template>
  <div class="md:col-span-1">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h2 class="card-title">分类</h2>
        <ul class="menu p-0 [&_li>*]:rounded-md  flex">
          <li v-for="category in props.categoryList" :key="category.categoryId">
            <a 
              :class="{ 'active': selectedCategory === category.categoryId }"
              @click="selectedCategory = category.categoryId as string"
            >
              {{ category.title }}
              <span class="badge badge-sm">{{ category.num }}</span>
            </a>
          </li>
        </ul>
        
        <div class="divider"></div>
        
        <h2 class="card-title">热门话题</h2>
        <div class="flex flex-wrap gap-2">
          <div v-for="(topic, index) in props.topicList" :key="index" class="badge badge-primary">
            {{ topic.title }}
          </div>
        </div>
        
        <div class="mt-4">
          <button class="btn btn-primary w-full">发布新帖</button>
        </div>
      </div>
    </div>
  </div>
</template>