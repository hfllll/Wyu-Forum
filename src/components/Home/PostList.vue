<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Post } from '@/types';
import { Like } from '@/api';
import { useRouter } from 'vue-router'
import { timeAgo } from '@/utils/timeAgo';

// 帖子列表的prop参数
export interface PostListProps {
    postList: Post[]
}

const props = defineProps<PostListProps>()

const router = useRouter()

const handleLike = async (post: Post) => {
    let likeOrUnlike = post.isLiked ? -1 : 1
    await Like({ postId:post.id , likeOrUnlike })
    post.isLiked = !post.isLiked
    post.likes += likeOrUnlike
}

const goPost = (id:string) => {

    router.push({
        name: 'Post',
        params: { id: id }
    })
}

const goAuthor = (id:string) => {

    router.push({
        name: 'ProfileWithId',
        params: { id: id }
    })
}

</script>

<template>
    <div v-if="!props.postList.length" class="space-y-6 p-4">
        <!-- 优化版骨架屏 -->
        <template v-for="() in 3" :key="i">
            <div class="card bg-base-100 shadow-md skeleton animate-pulse">
                <div class="card-body">
                    <div class="flex items-start space-x-4">
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full bg-base-200"></div>
                        </div>
                        <div class="flex-1">
                            <div class="h-7 bg-base-200 rounded-lg mb-3"></div>
                            <div class="h-5 bg-base-200 rounded mb-2"></div>
                            <div class="h-5 bg-base-200 rounded mb-4"></div>
                            <div class="flex gap-2">
                                <div class="h-4 w-16 bg-base-200 rounded"></div>
                                <div class="h-4 w-12 bg-base-200 rounded"></div>
                                <div class="h-4 w-8 bg-base-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-4 mt-6">
                        <div class="h-5 w-16 bg-base-200 rounded"></div>
                        <div class="h-5 w-16 bg-base-200 rounded"></div>
                        <div class="h-5 w-16 bg-base-200 rounded"></div>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <div v-else class="space-y-4 post-list">
        <div v-for="post in props.postList" :key="post.id" class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow post-card">
            <div class="card-body">
            <div class="flex items-start justify-between">
                <div class="flex items-start space-x-4">
                    <div class="avatar" @click="goAuthor(post.authorId)">
                        <div class="w-10 h-10 rounded-full hover:scale-110 cursor-pointer" >
                            <img :src="post.avatar" alt="用户头像" />
                        </div>
                    </div>
                    <div>
                        <h2 class="card-title hover:text-primary cursor-pointer line-clamp-1" @click="goPost(post.id)">{{ post.title }}</h2>
                        <div class="flex items-center text-sm text-base-content/70 mt-1 cursor-pointer" @click="goAuthor(post.authorId)">
                            <span class="hover:underline">{{ post.authorName }}</span>
                            <span class="mx-2">•</span>
                            <span>{{ timeAgo(post.createAt) }}</span>
                        </div>
                    </div>
                </div>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-xs btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>收藏</a></li>
                        <li><a>分享</a></li>
                        <li><a>举报</a></li>
                    </ul>
                </div>
            </div>

            <p class="text-base-content/80 mt-2 line-clamp-2 post-content">{{ post.content }}</p>

            <div class="flex flex-wrap gap-1 mt-2">
                <span v-for="(tag, index) in post.tags" :key="index" class="badge badge-outline">{{ tag }}</span>
            </div>

            <div class="card-actions justify-end mt-4">
                <button class="btn btn-ghost btn-sm gap-1" @click="handleLike(post)">
                    <svg v-show="!post?.isLiked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 ">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <svg v-show="post?.isLiked" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 animate__animated animate__flip">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    {{ post.likes }}
                </button>
                <button class="btn btn-ghost btn-sm gap-1" @click="goPost(post.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                    {{ post.comments }}
                </button>
                <button class="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>