<script lang="ts" setup>
import type { Topic } from '@/types';
import { Follow } from '@/api';

interface TopicinfoProps {
    topicInfo: Topic | null,
    topicId: string,
}

const toggleFollow = async () => {
    await Follow({
        id: props.topicId,
        isFollow: !props.topicInfo?.hasFollowed
    })
    if (props.topicInfo) {
        props.topicInfo.hasFollowed = !props.topicInfo.hasFollowed
        props.topicInfo.follows = props.topicInfo.hasFollowed ? props.topicInfo.follows + 1 : props.topicInfo.follows - 1
    }
}

const props = defineProps<TopicinfoProps>()

</script>

<template>
    <!-- 话题头部 -->
    <div class="card bg-base-100 shadow-2xl rounded-xl mb-6">
        <div class="card-body p-8">
            <!-- 骨架屏 -->
            <template v-if="!topicInfo">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="w-full">
                        <div class="skeleton h-10 w-3/4 mb-4"></div>
                        <div class="skeleton h-4 w-full mb-2"></div>
                        <div class="skeleton h-4 w-2/3"></div>
                        <div class="flex items-center gap-6 mt-4">
                            <div class="skeleton h-5 w-24"></div>
                            <div class="skeleton h-5 w-24"></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="skeleton h-12 w-24"></div>
                        <div class="skeleton h-12 w-12 rounded-full"></div>
                    </div>
                </div>
            </template>

            <!-- 实际内容 -->
            <template v-else>
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 class="text-3xl font-bold">{{ topicInfo?.title }}</h1>
                        <p class="text-base-content/70 mt-2">{{ topicInfo?.description }}</p>

                        <div class="flex items-center gap-6 mt-4">
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span>{{ topicInfo?.posts }} 篇帖子</span>
                            </div>

                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span>{{ topicInfo?.follows }} 位关注者</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button @click="toggleFollow" class="btn"
                            :class="topicInfo?.hasFollowed ? 'btn-outline' : 'btn-primary'">
                            {{ topicInfo?.hasFollowed ? '已关注' : '+ 关注话题' }}
                        </button>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </div>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>分享话题</a></li>
                                <li><a>举报话题</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>