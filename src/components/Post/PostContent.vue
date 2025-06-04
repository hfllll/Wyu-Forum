<script lang="ts" setup>
import { Collect } from '@/api';
import type { PostData } from '@/types';
import { defineProps } from 'vue';
interface ContentProps {
  post: PostData
}
const props = defineProps<ContentProps>()

const handleCollect = async ( post: PostData ) => {
  await Collect({
    postId: post.id,
    toCollect: !post.isCollected
  })
  post.isCollected = !post.isCollected
}
</script>

<template>
  <div class="card bg-base-100 shadow-lg mb-6">
  <div class="card-body">
    <!-- 帖子标题和作者信息 -->
    <div>
      <h1 class="text-2xl font-bold mb-2">{{ props.post.title }}</h1>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="avatar">
            <div class="w-8 h-8 rounded-full">
              <img :src="props.post.avatar" alt="用户头像" />
            </div>
          </div>
          <span class="font-medium">{{ props.post.author }}</span>
          <span class="text-base-content/60">{{ props.post.createdAt }}</span>
        </div>
        <div class="flex items-center space-x-2 text-base-content/60">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ props.post.views }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <!-- 帖子内容 -->
    <div class="prose max-w-none">
      <p class="whitespace-pre-line">{{ props.post.content }}</p>
    </div>
    
    <!-- 标签 -->
    <div class="flex flex-wrap gap-2 mt-4">
      <span v-for="(tag, index) in props.post.tags" :key="index" class="badge badge-outline">{{ tag }}</span>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex justify-between mt-6">
      <div class="flex space-x-2">
        <button class="btn btn-ghost btn-sm gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {{ props.post.likes }}
        </button>
        <button class="btn btn-ghost btn-sm gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {{ props.post.comments }}
        </button>
      </div>
      <div>
        <button class="btn btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button class="btn btn-ghost btn-sm" @click="handleCollect(props.post)">
          <svg v-show="props.post.isCollected" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate__animated animate__rubberBand" fill="red" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <svg v-show="!props.post.isCollected" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
</template>