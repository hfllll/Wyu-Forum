<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { RelatedPosts } from '@/types';
interface RelatedProps {
  relatedPostList: RelatedPosts[]
}

const router = useRouter()

const gotoPost = (id:string) => {
  router.push({
      name: 'Post',
      params: { id: id }
  })
}

const props = defineProps<RelatedProps>()
</script>

<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h2 class="card-title">相关帖子</h2>
      <ul class="menu p-0">
        <template v-if="props.relatedPostList.length" >
          <li v-for="relatedPost in props.relatedPostList" :key="relatedPost.id" @click="gotoPost(relatedPost.id)">
            <a class="text-primary">{{ relatedPost.title }}</a>
          </li>
        </template>
        <template v-else>
          <li v-for="i in 3" :key="i" class="animate-pulse">
            <a class="text-primary">
              <div class="h-5 w-4/5 skeleton"></div>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>