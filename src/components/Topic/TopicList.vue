<script lang='ts' setup>
import type { Topic } from '@/types'
import { Follow } from '@/api'
import router from '@/routers'
interface TopicListProps {
  topicList: Topic[]
}

const props = defineProps<TopicListProps>()

const handleFollow = async (topic: Topic) => {
  // 调用关注or取消关注接口
  await Follow({
    id: topic.id,
    isFollow: topic.hasFollowed ? false : true
  })
  topic.hasFollowed = !topic.hasFollowed
}

const goTopic = (id: string) => {
  router.push({
    name: 'TopicDetail',
    params: {
      id:id
    }
  })
}
</script>

<template>
  <div v-if="!props.topicList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 话题列表骨架屏 -->
        <template v-for="() in 9" :key="index">
            <div class="card bg-base-100 shadow-md skeleton animate-pulse">
                <div class="card-body">
                    <div class="h-6 bg-base-200 rounded-lg mb-3"></div>
                    <div class="h-4 bg-base-200 rounded mb-2"></div>
                    <div class="flex justify-between text-sm text-base-content/70 mt-4">
                        <div class="h-3 w-12 bg-base-200 rounded"></div>
                        <div class="h-3 w-12 bg-base-200 rounded"></div>
                    </div>
                    <div class="card-actions justify-end mt-6">
                        <div class="h-5 w-24 bg-base-200 rounded"></div>
                        <div class="h-5 w-24 bg-base-200 rounded"></div>
                    </div>
                </div>
            </div>
        </template>
  </div>
  <div  v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="topic in props.topicList" :key="topic.id" class="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
        <div class="card-body">
          <h2 class="card-title text-primary cursor-pointer" @click="goTopic(topic.id)">{{ topic.title }}</h2>
          <p>{{ topic.description }}</p>
          <div class="flex justify-between text-sm text-base-content/70 mt-2">
            <span>{{ topic.posts }} 帖子</span>
            <span>{{ topic.follows }} 关注</span>
          </div>
          <div class="card-actions justify-end mt-4">
            <button v-if="topic.hasFollowed" class="btn btn-soft btn-secondary btn-sm animate__animated animate__wobble" @click="handleFollow(topic)">取消关注</button>
            <button v-else class="btn btn-primary btn-sm " @click="handleFollow(topic)">关注</button>
            <button class="btn btn-outline btn-sm" @click="goTopic(topic.id)">查看</button>
          </div>
        </div>
    </div>
    </div>
</template>