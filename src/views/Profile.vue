<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import PostList from '@/components/Home/PostList.vue'
import type { Post } from '@/types'
import BackTop from '@/components/Base/BackTop.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 判断是否是当前用户的个人资料
const userId = ref(route.params.id || userStore.userInfo?.id)
const isCurrentUser = ref(userId.value === userStore.userInfo?.id)

// 用户信息
const userProfile = ref({
  name: isCurrentUser.value ? userStore.userInfo?.name : '其他用户',
  avatar: isCurrentUser.value ? userStore.userInfo?.avatar : 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  joinDate: '2023-01-01',
  bio: '这里是用户的个人简介内容，展示用户的兴趣爱好和相关信息。',
  postCount: 123,
  likeCount: 456,
  followerCount: 78,
  isFollowed: false
})

// 标签页
const tabs = [
  { id: 'posts', label: '发布的帖子' },
  { id: 'likes', label: '点赞的帖子' },
  { id: 'collections', label: '收藏的帖子' }
]
const activeTab = ref('posts')

// 模拟帖子数据
const posts = ref<Post[]>([])
const isLoading = ref(false)

// 切换标签
const switchTab = (tabId: string) => {
  activeTab.value = tabId
  fetchPosts(tabId)
}

// 获取帖子数据
const fetchPosts = async (type: string) => {
  isLoading.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟数据
    posts.value = Array(5).fill(null).map((_, index) => ({
      id: `post-${type}-${index}`,
      title: `${type === 'posts' ? '发布' : type === 'likes' ? '点赞' : '收藏'}的帖子 ${index + 1}`,
      authorId: userId.value as string,
      authorName: userProfile.value.name as string,
      avatar: userProfile.value.avatar as string,
      content: '这是帖子内容摘要...',
      tags: ['标签1', '标签2'],
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      images: '',
      looks: Math.floor(Math.random() * 500),
      isLiked: false
    }))
  } catch (error) {
    console.error('获取帖子失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 关注/取消关注用户
const toggleFollow = () => {
  userProfile.value.isFollowed = !userProfile.value.isFollowed
  if (userProfile.value.isFollowed) {
    userProfile.value.followerCount++
  } else {
    userProfile.value.followerCount--
  }
}

// 编辑资料
const editProfile = () => {
  router.push('/settings')
}

onActivated(() => {
  fetchPosts(activeTab.value)
})
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- 个人资料卡片 -->
    <div class="card bg-base-100 shadow-2xl rounded-xl mb-6">
      <div class="card-body p-8">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <!-- 头像区域 -->
          <div class="avatar">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img :src="userProfile.avatar" alt="用户头像" />
            </div>
          </div>
          
          <!-- 用户信息 -->
          <div class="flex-1">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl md:text-3xl font-bold">{{ userProfile.name }}</h2>
                <p class="text-sm text-base-content/60 mt-1">
                  <span class="badge badge-outline">活跃会员</span>
                  <span class="ml-2">加入时间：{{ userProfile.joinDate }}</span>
                </p>
              </div>
              
              <div>
                <button 
                  v-if="isCurrentUser" 
                  @click="editProfile"
                  class="btn btn-outline btn-primary btn-sm"
                >
                  编辑资料
                </button>
                <button 
                  v-else 
                  @click="toggleFollow"
                  class="btn btn-sm"
                  :class="userProfile.isFollowed ? 'btn-outline' : 'btn-primary'"
                >
                  {{ userProfile.isFollowed ? '已关注' : '+ 关注' }}
                </button>
              </div>
            </div>
            
            <p class="text-base-content/80 mt-4">{{ userProfile.bio }}</p>
            
            <!-- 统计信息 -->
            <div class="stats stats-horizontal bg-base-200 shadow mt-4">
              <div class="stat place-items-center">
                <div class="stat-value text-primary">{{ userProfile.postCount }}</div>
                <div class="stat-desc">发布帖子</div>
              </div>
              
              <div class="stat place-items-center">
                <div class="stat-value text-secondary">{{ userProfile.likeCount }}</div>
                <div class="stat-desc">获得点赞</div>
              </div>
              
              <div class="stat place-items-center">
                <div class="stat-value">{{ userProfile.followerCount }}</div>
                <div class="stat-desc">粉丝数量</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 标签页切换 -->
    <div class="tabs tabs-boxed mb-6">
      <a 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab"
        :class="{ 'tab-active': activeTab === tab.id }"
        @click="switchTab(tab.id)"
      >
        {{ tab.label }}
      </a>
    </div>
    
    <!-- 帖子列表 -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>
        
        <!-- 无内容状态 -->
        <div v-else-if="posts.length === 0" class="py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 class="text-xl font-bold mt-4">暂无内容</h3>
          <p class="text-base-content/70 mt-2">
            {{ 
              activeTab === 'posts' ? '还没有发布任何帖子' : 
              activeTab === 'likes' ? '还没有点赞任何帖子' : 
              '还没有收藏任何帖子' 
            }}
          </p>
          <button v-if="isCurrentUser && activeTab === 'posts'" class="btn btn-primary mt-4" @click="router.push('/create-post')">
            发布新帖子
          </button>
        </div>
        
        <!-- 帖子列表 -->
        <PostList v-else :postList="posts" />
      </div>
    </div>
    
    <BackTop />
  </div>
</template>