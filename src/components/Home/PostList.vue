<script lang="ts" setup>
import { ref } from 'vue';
type Post = {
    id: number,
    title: string,
    author: string,
    avatar: string,
    content: string,
    tags: string[],
    likes: number,
    comments: number,
    createdAt: string,
    isLiked?: boolean
}

const posts = ref<Post[]>([
    {
        id: 1,
        title: '如何提高编程效率？',
        author: '编程达人',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '分享一些提高编程效率的小技巧和工具推荐...',
        tags: ['编程', '效率', '工具'],
        likes: 42,
        comments: 15,
        createdAt: '2小时前',
        isLiked: false
    },
    {
        id: 2,
        title: 'Vue 3 和 React 的对比分析',
        author: '前端专家',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '本文将深入分析Vue 3和React两大前端框架的优缺点...',
        tags: ['Vue', 'React', '前端'],
        likes: 78,
        comments: 23,
        createdAt: '3小时前',
        isLiked: false
    },
    {
        id: 3,
        title: '大学生如何规划学习路线？',
        author: '学习规划师',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '针对大学生如何规划自己的学习路线，提供一些实用建议...',
        tags: ['学习', '规划', '大学生'],
        likes: 56,
        comments: 18,
        createdAt: '5小时前',
        isLiked: false
    },
    {
        id: 4,
        title: '校园社团活动组织经验分享',
        author: '社团达人',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '分享在校园中组织社团活动的经验和技巧...',
        tags: ['社团', '活动', '组织'],
        likes: 35,
        comments: 12,
        createdAt: '昨天',
        isLiked: false
    },
    {
        id: 5,
        title: '实习经验分享：我在科技公司的一个月',
        author: '实习生',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '分享在某科技公司实习的经历和收获...',
        tags: ['实习', '经验', '职场'],
        likes: 64,
        comments: 20,
        createdAt: '2天前',
        isLiked: false
    }
])

</script>

<template>
    <div v-for="post in posts" :key="post.id" class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div class="card-body">
            <div class="flex items-start justify-between">
                <div class="flex items-start space-x-4">
                    <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img :src="post.avatar" alt="用户头像" />
                        </div>
                    </div>
                    <div>
                        <h2 class="card-title hover:text-primary cursor-pointer">{{ post.title }}</h2>
                        <div class="flex items-center text-sm text-base-content/70 mt-1">
                            <span>{{ post.author }}</span>
                            <span class="mx-2">•</span>
                            <span>{{ post.createdAt }}</span>
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

            <p class="text-base-content/80 mt-2">{{ post.content }}</p>

            <div class="flex flex-wrap gap-1 mt-2">
                <span v-for="(tag, index) in post.tags" :key="index" class="badge badge-outline">{{ tag }}</span>
            </div>

            <div class="card-actions justify-end mt-4">
                <button class="btn btn-ghost btn-sm gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    {{ post.likes }}
                </button>
                <button class="btn btn-ghost btn-sm gap-1">
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
</template>