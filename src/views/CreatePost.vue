<script lang="ts" setup>
// 静态页面暂不需要逻辑，保留空setup
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="card bg-base-100 shadow-2xl rounded-xl">
      <div class="card-body p-8">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-primary">发布新帖子</h2>
          <p class="text-sm text-base-content/60 mt-1">请填写以下信息发布您的帖子</p>
        </div>

        <!-- 标题输入 -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">帖子标题</span>
          </label>
          <input type="text" placeholder="请输入帖子标题" class="input input-bordered input-primary focus:ring-primary focus:ring-2" />
        </div>

        <!-- 内容输入 -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">帖子内容</span>
          </label>
          <textarea class="textarea textarea-bordered textarea-primary h-32 focus:ring-primary focus:ring-2" placeholder="请输入帖子内容"></textarea>
        </div>

        <!-- 标签输入 -->
        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text">帖子标签（用空格分隔）</span>
          </label>
          <input type="text" placeholder="例如：校园 学习 活动" class="input input-bordered input-primary focus:ring-primary focus:ring-2" />
        </div>

        <!-- 操作按钮 -->
        <div class="card-actions justify-end gap-2">
          <button class="btn btn-ghost hover:bg-base-200">取消</button>
          <button class="btn btn-primary btn-active">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>