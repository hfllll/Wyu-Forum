<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import type { SaveProfileParams } from '@/types/user'
import { uploadAvatar, updateProfile } from '@/api'
import ChangeTheme from '@/components/user/ChangeTheme.vue'
const userStore = useUserStore()
const router = useRouter()

const password = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isSaving = ref(false)

const bio = ref(userStore.userInfo?.bio || '')
// 头像上传相关

const avatarPreview = ref(userStore.userInfo?.avatar || '')

// 处理头像选择
const handleAvatarChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        title: '错误',
        text: '文件过大，最大支持 2MB',
        icon: 'error',
        confirmButtonText: '确定'
      })
      return;
    }
    try{
      // 使用FormData 封装文件
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadAvatar(formData)
      if(res.code === 200){
        avatarPreview.value = res.data
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }
}

// 保存设置
const saveSettings = async () => {
  // 有密码修改
  if (password.value && newPassword.value && newPassword.value !== confirmPassword.value) {
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
    // 准备要保存的数据
    const saveData: SaveProfileParams = {
      bio: bio.value,
      avatar: avatarPreview.value,
    }
    
    if (newPassword.value) {
      // 如果新密码不为空，则需要更新密码
      saveData.password = newPassword.value
      saveData.oldPassword = password.value
    }
    
    // 更新个人信息
    const res = await updateProfile(saveData)
    if(res.code === 200){
      // 刷新状态管理中的用户信息
      userStore.setUserInfo(res.data)
    }
    
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
        <h2 class="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          账户设置
        </h2>

        <!-- 头像设置 -->
        <div class="form-control mb-8 bg-base-200 p-6 rounded-lg">
          <label class="label">
            <span class="label-text text-lg font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              个人头像
            </span>
          </label>
          <div class="flex items-center gap-6 mt-2">
            <div class="avatar">
              <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="avatarPreview" alt="用户头像" />
              </div>
            </div>
            <div>
              <label class="btn btn-primary btn-sm mb-2">
                <input type="file" class="hidden" accept="image/*" @change="handleAvatarChange" />
                更换头像
              </label>
              <p class="text-xs text-base-content/60">支持 JPG、PNG 格式，最大 2MB</p>
            </div>
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-base-200 p-6 rounded-lg">
          <div>
            <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              基本信息
            </h3>
            <div class="form-control">
              <label class="label">
                <span class="label-text">用户名</span>
              </label>
              <input type="text" :value="userStore.userInfo?.name || ''" class="input input-bordered" disabled />
              <label class="label">
                <span class="label-text-alt text-base-content/60 text-primary">用户名不可更改</span>
              </label>
            </div>
          </div>


          <div class="form-control">
            <label class="label mr-3">
              <span class="label-text mb-3">个人简介</span>
            </label>
            <textarea v-model="bio" placeholder="简短介绍一下自己吧~~"
              class="textarea textarea-bordered h-24 focus:textarea-primary" rows="1"></textarea>
            <label class="label">

            </label>
          </div>
        </div>

        <!-- 密码修改 -->
        <div class="bg-base-200 p-6 rounded-lg mb-8">
          <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            修改密码
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label class="label mr-3 mb-3">
                <span class="label-text">当前密码</span>
              </label>
              <input v-model="password" type="password" placeholder="请输入当前密码"
                class="input input-bordered focus:input-primary" />
            </div>

            <div></div>

            <div class="form-control">
              <label class="label mr-3 mb-3">
                <span class="label-text">新密码</span>
              </label>
              <input v-model="newPassword" type="password" placeholder="请输入新密码"
                class="input input-bordered focus:input-primary" />
            </div>

            <div class="form-control">
              <label class="label mr-3 mb-3">
                <span class="label-text">确认新密码</span>
              </label>
              <input v-model="confirmPassword" type="password" placeholder="请再次输入新密码"
                class="input input-bordered focus:input-primary" />
            </div>
          </div>
        </div>

        <!-- 主题设置 -->
        <ChangeTheme />

        <!-- 操作按钮 -->
        <div class="card-actions justify-end mt-8">
          <button @click="cancelChanges" class="btn btn-ghost">取消</button>
          <button @click="saveSettings" class="btn btn-primary" :class="{'loading': isSaving}" :disabled="isSaving">
            {{ isSaving ? '保存中...' : '保存设置' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>