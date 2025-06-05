<script lang="ts" setup>
// 静态页面暂不需要逻辑，保留空setup
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="card bg-base-100 shadow-2xl rounded-xl">
      <div class="card-body p-8">
        <h2 class="text-3xl font-bold text-primary mb-8">账户设置</h2>

        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text">用户名</span>
          </label>
          <input type="text" value="当前用户名" class="input input-bordered" disabled />
        </div>

        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text">邮箱</span>
          </label>
          <input type="email" placeholder="请输入新邮箱" class="input input-bordered" />
        </div>

        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text">通知设置</span>
          </label>
          <div class="flex items-center gap-4 mt-2">
            <label class="swap swap-rotate">
              <input type="checkbox" checked />
              <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 17.17l-5.59-5.59L7 12l1.41 1.41L13 19.17l5.59-5.59L20 12z"/></svg>
            </label>
            <span class="label-text">接收新消息通知</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="mt-8">
          <h3 class="text-lg font-medium mb-4">隐私设置</h3>
          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">允许其他用户查看我的帖子</span>
              <input type="radio" name="privacy" class="radio radio-primary" checked />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">仅关注用户可查看我的帖子</span>
              <input type="radio" name="privacy" class="radio radio-primary" />
            </label>
          </div>
        </div>

        <div class="card-actions justify-end mt-8">
          <button class="btn btn-ghost">取消</button>
          <button class="btn btn-primary">保存设置</button>
        </div>
      </div>
    </div>
  </div>
</template>