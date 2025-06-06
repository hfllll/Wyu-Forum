<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const receiveNotifications = ref(true)
const privacyOption = ref('public')
const theme = ref('system')
const isSaving = ref(false)

// 头像上传相关
const avatarFile = ref<File | null>(null)
const avatarPreview = ref(userStore.userInfo?.avatar || '')

// 处理头像选择
const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    avatarFile.value = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        avatarPreview.value = e.target.result as string
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

// 保存设置
const saveSettings = async () => {
  // 验证密码
  if (newPassword.value && newPassword.value !== confirmPassword.value) {
    Swal.fire({
      title: '错误',
      text: '两次输入的密码不一致',
      icon: 'error',
      confirmButtonText: '确定'
    })
    return
  }

  isSaving.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    Swal.fire({
      title: '保存成功！',
      text: '您的设置已更新',
      icon: 'success',
      confirmButtonText: '确定'
    })
  } catch (error) {
    Swal.fire({
      title: '保存失败',
      text: '请稍后重试',
      icon: 'error',
      confirmButtonText: '确定'
    })
  } finally {
    isSaving.value = false
  }
}

// 取消修改
const cancelChanges = () => {
  router.go(-1)
}
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="card bg-base-100 shadow-2xl rounded-xl">
      <div class="card-body p-8">
        <h2 class="text-3xl font-bold text-primary mb-8">账户设置</h2>

        <div class="tabs tabs-boxed mb-6">
          <a class="tab tab-active">个人资料</a>
          <a class="tab">安全设置</a>
          <a class="tab">通知偏好</a>
          <a class="tab">隐私设置</a>
        </div>

        <!-- 头像设置 -->
        <div class="form-control mb-8">
          <label class="label">
            <span class="label-text text-lg font-medium">头像</span>
          </label>
          <div class="flex items-center gap-6">
            <div class="avatar">
              <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="avatarPreview" alt="用户头像" />
              </div>
            </div>
            <div>
              <label class="btn btn-outline btn-sm mb-2">
                <input type="file" class="hidden" accept="image/*" @change="handleAvatarChange" />
                更换头像
              </label>
              <p class="text-xs text-base-content/60">支持 JPG、PNG 格式，最大 2MB</p>
            </div>
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="form-control">
            <label class="label">
              <span class="label-text">用户名</span>
            </label>
            <input type="text" :value="userStore.userInfo?.name || ''" class="input input-bordered" disabled />
            <label class="label">
              <span class="label-text-alt text-base-content/60">用户名不可更改</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">邮箱</span>
            </label>
            <input v-model="email" type="email" placeholder="请输入新邮箱" class="input input-bordered focus:input-primary" />
          </div>
        </div>

        <!-- 密码修改 -->
        <div class="bg-base-200 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-medium mb-4">修改密码</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text">当前密码</span>
              </label>
              <input v-model="password" type="password" placeholder="请输入当前密码" class="input input-bordered focus:input-primary" />
            </div>
            
            <div></div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">新密码</span>
              </label>
              <input v-model="newPassword" type="password" placeholder="请输入新密码" class="input input-bordered focus:input-primary" />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">确认新密码</span>
              </label>
              <input v-model="confirmPassword" type="password" placeholder="请再次输入新密码" class="input input-bordered focus:input-primary" />
            </div>
          </div>
        </div>

        <!-- 通知设置 -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">通知设置</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">新消息通知</h4>
                <p class="text-sm text-base-content/60">当有人回复您的帖子或评论时通知您</p>
              </div>
              <input v-model="receiveNotifications" type="checkbox" class="toggle toggle-primary" />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">点赞通知</h4>
                <p class="text-sm text-base-content/60">当有人点赞您的帖子或评论时通知您</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium">系统通知</h4>
                <p class="text-sm text-base-content/60">接收系统更新和重要公告</p>
              </div>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </div>
          </div>
        </div>

        <!-- 隐私设置 -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">隐私设置</h3>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input v-model="privacyOption" type="radio" name="privacy" value="public" class="radio radio-primary" />
              <div>
                <h4 class="font-medium">公开</h4>
                <p class="text-sm text-base-content/60">所有人可以查看您的帖子和个人资料</p>
              </div>
            </label>
          </div>
          
          <div class="form-control mt-2">
            <label class="label cursor-pointer justify-start gap-4">
              <input v-model="privacyOption" type="radio" name="privacy" value="followers" class="radio radio-primary" />
              <div>
                <h4 class="font-medium">仅关注者</h4>
                <p class="text-sm text-base-content/60">只有关注您的用户可以查看您的帖子和个人资料</p>
              </div>
            </label>
          </div>
          
          <div class="form-control mt-2">
            <label class="label cursor-pointer justify-start gap-4">
              <input v-model="privacyOption" type="radio" name="privacy" value="private" class="radio radio-primary" />
              <div>
                <h4 class="font-medium">私密</h4>
                <p class="text-sm text-base-content/60">您的帖子和个人资料对其他用户不可见</p>
              </div>
            </label>
          </div>
        </div>

        <!-- 主题设置 -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">主题设置</h3>
          
          <div class="flex flex-wrap gap-4">
            <label class="cursor-pointer flex flex-col items-center gap-2">
              <input v-model="theme" type="radio" name="theme" value="light" class="radio radio-primary hidden" />
              <div class="w-20 h-20 bg-base-100 border-4 rounded-lg flex items-center justify-center" :class="{'border-primary': theme === 'light'}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span>浅色</span>
            </label>
            
            <label class="cursor-pointer flex flex-col items-center gap-2">
              <input v-model="theme" type="radio" name="theme" value="dark" class="radio radio-primary hidden" />
              <div class="w-20 h-20 bg-neutral text-neutral-content border-4 rounded-lg flex items-center justify-center" :class="{'border-primary': theme === 'dark'}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <span>深色</span>
            </label>
            
            <label class="cursor-pointer flex flex-col items-center gap-2">
              <input v-model="theme" type="radio" name="theme" value="system" class="radio radio-primary hidden" />
              <div class="w-20 h-20 bg-gradient-to-r from-base-100 to-neutral text-neutral-content border-4 rounded-lg flex items-center justify-center" :class="{'border-primary': theme === 'system'}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>跟随系统</span>
            </label>
          </div>
        </div>

        <div class="divider"></div>

        <!-- 操作按钮 -->
        <div class="card-actions justify-end mt-8">
          <button @click="cancelChanges" class="btn btn-ghost">取消</button>
          <button 
            @click="saveSettings" 
            class="btn btn-primary" 
            :class="{'loading': isSaving}"
            :disabled="isSaving"
          >
            {{ isSaving ? '保存中...' : '保存设置' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>