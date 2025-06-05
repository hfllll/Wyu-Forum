<script lang="ts" setup>
import { followAuthor } from '@/api';
import type { Author } from '@/types';
interface AuthorProps {
  author: Author | null
}

const props = defineProps<AuthorProps>()

const handleFollow = async (author: Author | null) => {
  if ( !author ) return
  await followAuthor({
    authorId: author.authorID,
    toFollow: !author.isFollowd
  })
  author.isFollowd = !author.isFollowd
}
</script>

<template>
  <div class="card bg-base-100 shadow-lg mb-6">
      <template v-if="props.author">
    <div class="card-body items-center text-center">
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img :src="props.author?.avatar" alt="用户头像" />
        </div>
      </div>
      <h2 class="card-title mt-2">{{ props.author?.author }}</h2>
      <p class="text-sm text-base-content/60">活跃会员</p>
      <div class="flex gap-4 mt-2">
        <div class="text-center">
          <div class="font-bold">{{ props.author?.postNum }}</div>
          <div class="text-xs text-base-content/60">帖子</div>
        </div>
        <div class="text-center">
          <div class="font-bold">{{ props.author?.likeNum }}</div>
          <div class="text-xs text-base-content/60">获赞</div>
        </div>
        <div class="text-center">
          <div class="font-bold">{{ props.author?.fansNUm }}</div>
          <div class="text-xs text-base-content/60">粉丝</div>
        </div>
      </div>
      <div v-show="props.author?.isFollowd === null" class="card-actions mt-4">
        <button v-if="props.author?.isFollowd" class="btn btn-primary btn-sm" @click="handleFollow(props.author)">关注</button>
        <button v-else class="btn btn-soft btn-secondary btn-sm" @click="handleFollow(props.author)">取消关注</button>
        <button class="btn btn-outline btn-sm">私信</button>
      </div>
    </div>
    </template>
    <template v-else>
      <div class="card-body items-center text-center">
        <!-- 头像占位 -->
        <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-skeleton animate-pulse mb-4"></div>
        <!-- 名字占位 -->
        <div class="h-6 w-32 bg-skeleton mb-2"></div>
        <!-- 身份描述占位 -->
        <div class="h-4 w-24 bg-skeleton mb-4"></div>
        <!-- 统计数字占位 -->
        <div class="flex gap-4 mb-4">
          <div class="text-center">
            <div class="h-6 w-12 bg-skeleton mb-1"></div>
            <div class="h-4 w-12 bg-skeleton"></div>
          </div>
          <div class="text-center">
            <div class="h-6 w-12 bg-skeleton mb-1"></div>
            <div class="h-4 w-12 bg-skeleton"></div>
          </div>
          <div class="text-center">
            <div class="h-6 w-12 bg-skeleton mb-1"></div>
            <div class="h-4 w-12 bg-skeleton"></div>
          </div>
        </div>
        <!-- 按钮占位 -->
        <div class="card-actions mt-4">
          <div class="h-8 w-24 bg-skeleton"></div>
          <div class="h-8 w-24 bg-skeleton"></div>
        </div>
      </div>
    </template>
  </div>
</template>