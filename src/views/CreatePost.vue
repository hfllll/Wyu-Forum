<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { getPostCategory, getTrendingTopic, PublishPost } from '@/api'
import type { PostCategory, TrendingTopic, PublishPostParams } from '@/types'

const router = useRouter()
const postTitle = ref<string>('')
const postContent = ref<string>('')
const isSubmitting = ref<boolean>(false)

// 分类和话题
const categories = ref<PostCategory[]>([])
const selectedCategory = ref<string>('')

// 常用标签
const commonTags = ref<TrendingTopic[]>([])
const selectedTags = ref<string[]>([])

// 获取分类和话题
const fetchCategoriesAndTopics = async () => {
  try {
    const [categoryRes, topicRes] = await Promise.all([
      getPostCategory(),
      getTrendingTopic()
    ])
    
    categories.value = categoryRes.data
    commonTags.value = topicRes.data
  } catch (error) {
    console.error('获取分类和话题失败:', error)
    
    // 模拟数据
    categories.value = [
      { categoryId: '1', title: '校园生活', num: '128' },
      { categoryId: '2', title: '学习交流', num: '96' },
      { categoryId: '3', title: '活动通知', num: '64' },
      { categoryId: '4', title: '求职就业', num: '32' }
    ]
    
    commonTags.value = [
      { topicId: '1', title: '期末考试' },
      { topicId: '2', title: '校园美食' },
      { topicId: '3', title: '社团招新' },
      { topicId: '4', title: '实习经验' }
    ]
  }
}

// 处理标签选择
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    // 最多选择5个标签
    if (selectedTags.value.length >= 5) {
      Swal.fire({
        title: '提示',
        text: '最多只能选择5个标签',
        icon: 'warning',
        confirmButtonText: '确定'
      })
      return
    }
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// 提交表单
const submitPost = async () => {
  // 表单验证
  if (!postTitle.value.trim()) {
    Swal.fire({
      title: '提示',
      text: '请输入帖子标题',
      icon: 'warning',
      confirmButtonText: '确定'
    })
    return
  }

  if (!postContent.value.trim()) {
    Swal.fire({
      title: '提示',
      text: '请输入帖子内容',
      icon: 'warning',
      confirmButtonText: '确定'
    })
    return
  }

  if (!selectedCategory.value) {
    Swal.fire({
      title: '提示',
      text: '请选择帖子分类',
      icon: 'warning',
      confirmButtonText: '确定'
    })
    return
  }

  isSubmitting.value = true

  try {    
    // 构建发布数据
    const postData: PublishPostParams = {
      title: postTitle.value,
      content: postContent.value,
      labelId: selectedCategory.value,
      topic: selectedTags.value
    }
    await PublishPost(postData)
    
    Swal.fire({
      title: '发布成功！',
      icon: 'success',
      confirmButtonText: '返回上一页'
    }).then(() => {
      router.go(-1)
    })
  } catch (error) {
    Swal.fire({
      title: '发布失败',
      text: '请稍后重试',
      icon: 'error',
      confirmButtonText: '确定'
    })
  } finally {
    isSubmitting.value = false
  }
}

// 取消发布
const cancelPost = () => {
  router.go(-1)
}

onMounted(() => {
  fetchCategoriesAndTopics()
})
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="card bg-base-100 shadow-2xl rounded-xl">
      <div class="card-body p-8 ">
        <div class="mb-8 flex items-center">
          <div class="flex-1">
            <h2 class="text-3xl font-bold text-primary">发布新帖子</h2>
            <p class="text-sm text-base-content/60 mt-1">分享你的想法和经验</p>
          </div>
        </div>

        <!-- 标题输入 -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-lg font-medium">帖子标题</span>
            <span class="label-text-alt text-error mr-2">*必填</span>
          </label>
          <input v-model="postTitle" type="text" placeholder="请输入一个吸引人的标题（5-50字）"
            class="input input-bordered input-primary focus:ring-primary focus:ring-2" />
        </div>

        <!-- 分类选择 -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-lg font-medium">帖子分类</span>
            <span class="label-text-alt text-error mr-2">*必选</span>
          </label>
          <select v-model="selectedCategory" class="select select-bordered focus:select-primary">
            <option value="" disabled selected>请选择帖子分类</option>
            <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
              {{ category.title }} ({{ category.num }}篇帖子)
            </option>
          </select>
        </div>

        <!-- 内容输入 -->
        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text text-lg font-medium">帖子内容</span>
            <span class="label-text-alt text-error mr-2">*必填</span>
          </label>
          <textarea v-model="postContent" class="textarea textarea-bordered h-48 focus:textarea-primary"
            placeholder="请输入帖子内容"></textarea>
        </div>

        <!-- 标签选择 -->
        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text text-lg font-medium">帖子标签</span>
            <span class="label-text-alt">最多选择5个标签</span>
          </label>

          <div class="flex flex-wrap gap-2 mt-2">
            <div v-for="tag in commonTags" :key="tag.topicId" @click="toggleTag(tag.title)"
              class="badge badge-lg cursor-pointer"
              :class="selectedTags.includes(tag.title) ? 'badge-primary' : 'badge-outline'">
              {{ tag.title }}
            </div>
          </div>

          <div v-if="selectedTags.length > 0" class="mt-5">
            <p class="text-sm font-medium mb-3">已选标签:</p>
            <div class="flex flex-wrap gap-2">
              <div v-for="(tag, index) in selectedTags" :key="index"
                class="badge badge-primary gap-1 animate__animated animate__heartBeat">
                {{ tag }}
                <svg @click="toggleTag(tag)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  class="inline-block w-4 h-4 stroke-current cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="card-actions justify-end gap-2 mt-6">
          <button @click="cancelPost" class="btn btn-ghost hover:bg-base-200">取消</button>
          <button @click="submitPost" class="btn btn-primary " :disabled="isSubmitting">
            {{ isSubmitting ? '发布中...' : '发布帖子' }} <span class="loading loading-spinner loading-xs"
              v-if="isSubmitting" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>