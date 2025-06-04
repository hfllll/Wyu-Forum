<script lang="ts" setup>
import { defineProps } from 'vue';
import type { FatherComment } from '@/types';
import ComItem from '@/components/Post/ComItem.vue';
import { useUserStore } from '@/stores';

const userStore = useUserStore()
interface CommentListProps{
  commentsList: FatherComment[]
  postId: string
}

const props = defineProps<CommentListProps>()
</script>

<template>
  <!-- 评论列表 -->
  <div class="space-y-6 mt-4">
    <div v-for="comment in props.commentsList" :key="comment.id" class="border-b border-base-300 pb-4">
      <ComItem :comment="comment"  :post-id="postId" :avatar="userStore.$state.userInfo?.avatar" />
    </div>
  </div>
</template>