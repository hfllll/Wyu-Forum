<script lang="ts" setup>
import type { Recommendations } from '@/types';

interface RecommendationProps {
  recommendations: Recommendations[]
}

const props = defineProps<RecommendationProps>()
</script>

<template>
  <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">精选推荐</h2>
        <button class="btn btn-sm btn-link">更多推荐</button>
      </div>
      
      <div class="space-y-4">
        <template v-if="props.recommendations.length">
          <div v-for="item in props.recommendations" :key="item.id" class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="text-base-content/70">作者：{{ item.author }}</p>
            <div class="card-actions justify-between mt-2">
              <div class="flex items-center gap-4 text-sm text-base-content/70">
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ item.likes }}
                </span>
                <span class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ item.views }}
                </span>
              </div>
              <button class="btn btn-outline btn-sm">查看</button>
            </div>
          </div>
        </div>
        </template>
        <template v-else>
          <div class="card bg-base-100 shadow-lg animate-pulse" v-for="i in 3" :key="i">
            <div class="card-body">
              <div class="h-6 w-3/4 bg-skeleton mb-2"></div>
              <div class="h-4 w-1/2 bg-skeleton mb-4"></div>
              <div class="card-actions justify-between mt-2">
                <div class="flex items-center gap-4">
                  <div class="h-4 w-1/4 bg-skeleton"></div>
                  <div class="h-4 w-1/4 bg-skeleton"></div>
                </div>
                <div class="h-8 w-24 bg-skeleton"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
</template>