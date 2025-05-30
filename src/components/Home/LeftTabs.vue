<script lang="ts" setup>
import { ref } from 'vue'
type CategoryType = { 
  id: number,
  name: string,
  count: number
}
type HotTopicType = {
  id: number,
  name: string,
  count: number
}
const categories = ref<CategoryType[]>([
  { id: 1, name: '全部', count: 152 },
  { id: 2, name: '学习', count: 43 },
  { id: 3, name: '校园', count: 38 },
  { id: 4, name: '生活', count: 27 },
  { id: 5, name: '技术', count: 25 },
  { id: 6, name: '职场', count: 19 }
])

const selectedCategory = ref(1)

const hotTopics = ref<HotTopicType[]>([
  { id: 1, name: '期末考试', count: 152 },
  { id: 2, name: '实习机会', count: 43 },
  { id: 3, name: '编程竞赛', count: 38 },
  { id: 4, name: '考研经验', count: 27 },
  { id: 5, name: '校园活动', count: 25 }
])
</script>

<template>
  <div class="md:col-span-1">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h2 class="card-title">分类</h2>
        <ul class="menu p-0 [&_li>*]:rounded-md  flex">
          <li v-for="category in categories" :key="category.id">
            <a 
              :class="{ 'active': selectedCategory === category.id }"
              @click="selectedCategory = category.id"
            >
              {{ category.name }}
              <span class="badge badge-sm">{{ category.count }}</span>
            </a>
          </li>
        </ul>
        
        <div class="divider"></div>
        
        <h2 class="card-title">热门话题</h2>
        <div class="flex flex-wrap gap-2">
          <div v-for="(topic, index) in hotTopics" :key="index" class="badge badge-primary">
            {{ topic.name }}
          </div>
        </div>
        
        <div class="mt-4">
          <button class="btn btn-primary w-full">发布新帖</button>
        </div>
      </div>
    </div>
  </div>
</template>