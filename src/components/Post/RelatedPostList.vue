<script lang="ts" setup>
import type { RelatedPosts } from '@/types';
interface RelatedProps {
  relatedPostList: RelatedPosts[]
}
const props = defineProps<RelatedProps>()
</script>

<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h2 class="card-title">相关帖子</h2>
      <ul class="menu p-0">
        <li v-for="relatedPost in props.relatedPostList" :key="relatedPost.postId">
          <a class="text-primary">{{ relatedPost.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>