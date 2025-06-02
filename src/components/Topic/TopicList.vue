<script lang='ts' setup>
import { ref } from 'vue'
import type { Topic } from '@/types'
import { Follow } from '@/api'

interface TopicListProps {
  topicList: Topic[]
}

const topicList = ref<TopicListProps[]>([
  {
    id: '1',
    title: '编程技术',
    description: '讨论编程语言、框架和开发技巧',
    posts: 183,
    followers: 256
  },
  {
    id: '2',
    title: '校园生活',
    description: '分享校园趣事、活动和日常生活',
    posts: 145,
    followers: 198
  },
  {
    id: '3',
    title: '学习经验',
    description: '交流学习方法、考试技巧和学习资源',
    posts: 127,
    followers: 176
  },
  {
    id: '4',
    title: '实习就业',
    description: '分享实习经历、求职技巧和职场经验',
    posts: 98,
    followers: 153
  },
  {
    id: '5',
    title: '校园活动',
    description: '发布和讨论各类校园活动信息',
    posts: 87,
    followers: 121
  },
  {
    id: '6',
    title: '考研专区',
    description: '考研经验、资料分享和备考交流',
    posts: 76,
    followers: 110
  }
])

const props = defineProps<TopicListProps>()

const handleFollow = async (topic: Topic) => {
  // 调用关注or取消关注接口
  await Follow({
    id: topic.id,
    isFollow: topic.hasFollowed ? false : true
  })
  topic.hasFollowed = !topic.hasFollowed
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="topic in props.topicList" :key="topic.id" class="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
        <div class="card-body">
          <h2 class="card-title text-primary">{{ topic.title }}</h2>
          <p>{{ topic.description }}</p>
          <div class="flex justify-between text-sm text-base-content/70 mt-2">
            <span>{{ topic.posts }} 帖子</span>
            <span>{{ topic.followers }} 关注</span>
          </div>
          <div class="card-actions justify-end mt-4">
            <button v-if="topic.hasFollowed" class="btn btn-soft btn-secondary btn-sm animate__animated animate__wobble" @click="handleFollow(topic)">取消关注</button>
            <button v-else class="btn btn-primary btn-sm " @click="handleFollow(topic)">关注</button>
            <button class="btn btn-outline btn-sm">查看</button>
          </div>
        </div>
      </div>
    </div>
</template>