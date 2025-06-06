<script lang="ts" setup>
import { joinActivity } from '@/api';
import type { Activity } from '@/types';
import dayjs from 'dayjs';
import { defineProps } from 'vue';

interface ActivityProps {
  activities: Activity[]
}

const props = defineProps<ActivityProps>()

const handleJoin = async (activity: Activity) => {
  await joinActivity({
    id:activity.id,
    isJoin: !activity.hasJoined
  })
  activity.hasJoined = !activity.hasJoined
}
</script>

<template>
  <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">校园活动</h2>
        <button class="btn btn-sm btn-link">查看全部</button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="activity in props.activities" :key="activity.id" class="card bg-base-100 shadow-lg">
          <figure><img :src="activity.image" alt="活动图片" class="h-48 w-full object-cover" /></figure>
          <div class="card-body">
            <h2 class="card-title">{{ activity.title }}</h2>
            <div class="flex flex-col gap-1 text-sm">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ dayjs(activity.date).format('YYYY-MM-DD HH:mm') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ activity.location }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{{ activity.participants }} 人参与</span>
              </div>
            </div>
            <div class="card-actions justify-end mt-2">
              <button v-if="activity.hasJoined" class="btn btn-info btn-outline btn-sm animate-animated animate-bounce" @click="handleJoin(activity)">已参加</button>
              <button v-else class="btn btn-primary btn-sm" @click="handleJoin(activity)">参加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>