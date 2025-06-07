<script lang="ts" setup>
import type { UserProfile } from '@/types';
import { computed, defineProps } from 'vue';
import { followAuthor } from '@/api';
import { useRoute } from 'vue-router';
import router from '@/routers';
import { useUserStore } from '@/stores';

interface PanelProps {
  userProfile: UserProfile | null
}

const route = useRoute()
const userStore = useUserStore()


const isCurrentUser = computed(() => !route.params.id ||  userStore.$state.userInfo?.id === route.params.id)

// 关注/取消关注用户
const toggleFollow = async () => {
  try{
    await followAuthor({
      authorId: route.params.id as string,
      toFollow: !props.userProfile?.isFollowed as boolean
    })
    if (props.userProfile){
      props.userProfile.isFollowed = !props.userProfile.isFollowed
    }
  }catch (err) {
    console.log(err);
  }
}

// 编辑资料
const editProfile = () => {
  router.push('/settings')
}

const props = defineProps<PanelProps>()
</script>

<template>
    <div class="card bg-base-100 shadow-2xl rounded-xl mb-6">
    <div class="card-body p-8">
      <!-- 骨架屏 -->
      <div v-if="!userProfile" class="flex flex-col md:flex-row md:items-center gap-10">
        <!-- 头像骨架 -->
        <div class="avatar">
          <div class="skeleton w-24 h-24 md:w-32 md:h-32 rounded-full"></div>
        </div>
        
        <!-- 用户信息骨架 -->
        <div class="flex-1">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="skeleton h-8 w-48 mb-2"></div>
              <div class="skeleton h-4 w-32 mt-1"></div>
            </div>
            
            <div>
              <div class="skeleton h-8 w-20"></div>
            </div>
          </div>
          
          <div class="skeleton h-4 w-3/4 mt-4"></div>
          
          <!-- 统计信息骨架 -->
          <div class="stats stats-horizontal bg-base-200 shadow mt-4">
            <div class="stat place-items-center">
              <div class="skeleton h-8 w-12"></div>
              <div class="skeleton h-4 w-16 mt-1"></div>
            </div>
            
            <div class="stat place-items-center">
              <div class="skeleton h-8 w-12"></div>
              <div class="skeleton h-4 w-16 mt-1"></div>
            </div>
            
            <div class="stat place-items-center">
              <div class="skeleton h-8 w-12"></div>
              <div class="skeleton h-4 w-16 mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实际内容 -->
      <div v-else class="flex flex-col md:flex-row md:items-center gap-6">
        <!-- 头像区域 -->
        <div class="avatar">
          <div class="w-24 h-24 md:w-32 md:h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="userProfile?.avatar" alt="用户头像" />
          </div>
        </div>
        
        <!-- 用户信息 -->
        <div class="flex-1">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold">{{ userProfile?.name }}</h2>
              <p class="text-sm text-base-content/60 mt-1">
                <span class="badge badge-outline">{{ userProfile?.identify }}</span>
                <span class="ml-2">加入时间：{{ userProfile?.joinDate }}</span>
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
                :class="userProfile?.isFollowed ? 'btn-outline' : 'btn-primary'"
              >
                {{ userProfile?.isFollowed ? '已关注' : '+ 关注' }}
              </button>
            </div>
          </div>
          
          <p class="text-base-content/80 mt-4">{{ userProfile?.bio }}</p>
          
          <!-- 统计信息 -->
          <div class="stats stats-horizontal bg-base-200 shadow mt-4 scroll-auto w-full max-w-90">
            <div class="stat place-items-center">
              <div class="stat-value text-primary">{{ userProfile?.postCount }}</div>
              <div class="stat-desc">发布帖子</div>
            </div>
            
            <div class="stat place-items-center">
              <div class="stat-value text-secondary">{{ userProfile?.likeCount }}</div>
              <div class="stat-desc">获得点赞</div>
            </div>
            
            <div class="stat place-items-center">
              <div class="stat-value">{{ userProfile?.fanCount }}</div>
              <div class="stat-desc">粉丝数量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>