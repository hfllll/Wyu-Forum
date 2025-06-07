<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostList from '@/components/Home/PostList.vue'
import UserPanel from '@/components/user/UserPanel.vue'
import BackTop from '@/components/Base/BackTop.vue'
import type { Post, PostsParams, UserProfile } from '@/types'
import { getPostList, getProfile } from '@/api'
import { useUserStore } from '@/stores'


const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 判断是否是当前用户的个人资料
const userId:string = (route.params.id || userStore.$state.userInfo?.id) as string

const isCurrentUser = computed(() => !route.params.id ||  userStore.$state.userInfo?.id === route.params.id)

// 用户信息
const userProfile = ref<UserProfile | null>(null)

// 帖子查询传参
const postParams = reactive<PostsParams>({
  userId: userId,
  type: 1,
  pageNum: 1,
  pageSize: 10
})

// 标签页
const tabs = [
  { id: 1, label: '发布的帖子' },
  { id: 2, label: '点赞的帖子' },
  { id: 3, label: '收藏的帖子' }
]

const activeTab = ref(1)

// 模拟帖子数据
const posts = ref<Post[]>([])
const isLoading = ref(false)

// 切换标签
const switchTab = async (tabId: 1 | 2 | 3) => {
  activeTab.value = tabId
  postParams.type = tabId
  await fetchPosts()
}

// 获取个人信息
const fetchUserInfo = async () => {
  
  try {
    const { data } = await getProfile({
      userId: userId
    })
    userProfile.value = { ...data }
  } catch (error) {
    console.error('获取帖子失败:', error)
  } finally {
    
  }
}

// 获取对应帖子
const fetchPosts = async () => {
  isLoading.value = true
  try{
    const { data } = await getPostList(postParams)
    posts.value = data.records
  } catch (error) {
    console.log();
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchUserInfo(), fetchPosts()])
})
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- 个人资料卡片 -->
    <UserPanel :user-profile="userProfile" />
    
    <!-- 标签页切换 -->
    <div class="tabs tabs-boxed mb-6">
      <a 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab"
        :class="{ 'tab-active': activeTab === tab.id }"
        @click="switchTab(tab.id as 1 | 2 | 3)"
      >
        {{ tab.label }}
      </a>
    </div>
    
    <!-- 帖子列表 -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="flex justify-center py-8 h-62 items-center">
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
              activeTab === 1 ? '还没有发布任何帖子' : 
              activeTab === 2 ? '还没有点赞任何帖子' : 
              '还没有收藏任何帖子' 
            }}
          </p>
          <button v-if="isCurrentUser && activeTab === 1" class="btn btn-primary mt-4" @click="router.push('/create')">
            发布新帖子
          </button>
        </div>
        
        <!-- 帖子列表 -->
        <PostList v-else :post-list="posts" />
      </div>
    </div>
    
    <BackTop />
  </div>
</template>