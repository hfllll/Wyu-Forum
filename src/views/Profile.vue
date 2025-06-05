<script lang="ts" setup>
// 静态页面暂不需要逻辑，保留空setup
import PostList from '@/components/Home/PostList.vue'
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="card bg-base-100 shadow-2xl rounded-xl">
      <div class="card-body p-8">
        <div class="flex items-center gap-6 mb-8">
          <div class="avatar">
            <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="" alt="用户头像" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold">用户名</h2>
            <p class="text-sm text-base-content/60 mt-1">活跃会员 · 加入时间：2023-01-01</p>
            <button class="btn btn-ghost btn-sm mt-2">编辑资料</button>
          </div>
        </div>

        <div class="divider"></div>

        <div class="mt-6">
          <h3 class="text-lg font-medium mb-4">个人简介</h3>
          <p class="text-base-content/80">这里是用户的个人简介内容，展示用户的兴趣爱好和相关信息。</p>
        </div>

        <div class="mt-8">

        
          <h3 class="text-lg font-medium mb-4">统计信息</h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="card bg-base-200 shadow-sm">
              <div class="card-body text-center">
                <div class="text-2xl font-bold">123</div>
                <div class="text-sm">发布帖子</div>
              </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
              <div class="card-body text-center">
                <div class="text-2xl font-bold">456</div>
                <div class="text-sm">获得点赞</div>
              </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
              <div class="card-body text-center">
                <div class="text-2xl font-bold">78</div>
                <div class="text-sm">粉丝数量</div>
              </div>
            </div>
          </div>
          <div class="mt-8">
          <h3 class="text-lg font-medium mb-4">发帖历史</h3>
            <PostList :post-list="[]" />
        </div>
        </div>
      </div>
    </div>
  </div>
</template>