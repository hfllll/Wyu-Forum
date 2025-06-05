<script setup lang="ts">
import { GetComments,  getPostDetail, SetComment } from '@/api'
import type { PostData, RelatedPosts,  Author, FatherComment } from '@/types'
import {  onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores'
import PostContent from '@/components/Post/PostContent.vue'
import AuthorContent from '@/components/Post/AuthorContent.vue'
import RelatedPostList from '@/components/Post/RelatedPostList.vue'
import CommentList from '@/components/Post/CommentList.vue'
import BackTop from '@/components/Base/BackTop.vue'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'

const userStore = useUserStore()
const route = useRoute()
const postId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const isComment = ref<boolean>(false)

// 模拟帖子数据
const post = ref<PostData | null>(null)


// 模拟评论数据
const comments = ref<FatherComment[]>([])

// 关联的帖子
const relatedPostList = ref<RelatedPosts[]>([])



// 作者信息
const author = ref<Author | null>(null)

const newComment = ref('')

const submitComment = async () => {
  if (newComment.value.trim()) {
    isComment.value = true
    await SetComment({
      parentId: postId, // 如果一级评论为postId 二级为父Id
      commentContent: '程嘉名没鸡鸡',
      postId: postId,
      level: 1 
    })
    comments.value.unshift({
      id: uuidv4(),
      userId: uuidv4(),
      author: '当前用户',
      avatar: userStore.$state.userInfo?.avatar as string,
      content: newComment.value,
      likes: 0,
      createTime: '刚刚',
      commentCounts: 0,
      commentList:[]
    })
    Swal.fire({
      title: '发布评论成功！',
      // text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: '林被知了'
    })
    newComment.value = ''
    isComment.value = false
  }
}

const fetchDetail = async (postId:string) => {
  const { data: { postData, authorData, relatedPosts } } = await getPostDetail({
    postId: postId
  })
  post.value = postData
  author.value = authorData
  relatedPostList.value = relatedPosts
}

// 获取初步评论
const fetchComment = async () => {
  const { data } = await GetComments({
    postId: postId
  })
  comments.value = data
}


onMounted(async () => {
  newComment.value = ''
  isComment.value = false
  await Promise.all([fetchDetail(postId), fetchComment()])
})
</script>

<template>
  <div>
    <!-- 帖子详情 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 主内容区 -->
      <div class="md:col-span-3">
        <PostContent :post="post" />
        
        <!-- 评论区 -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title">评论 ({{ comments.length }})</h2>
            
            <!-- 评论输入框 -->
            <div class="form-control mt-4">
              <div class="flex items-start gap-2">
                <div class="avatar">
                  <div class="w-10 h-10 rounded-full">
                    <img :src="userStore.$state.userInfo?.avatar" alt="用户头像" />
                  </div>
                </div>
                <div class="flex-1">
                  <textarea 
                    v-model="newComment" 
                    class="textarea textarea-bordered w-full" 
                    placeholder="写下你的评论..."
                    rows="3"
                  ></textarea>
                  <div class="flex justify-end mt-2">
                    <button v-show="!isComment" @click="submitComment" class="btn btn-primary" >发表评论</button>
                    <button v-show="isComment" class="btn btn-secondary" ><span class="loading loading-spinner" />发布中</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="divider" />
            
            <CommentList :commentsList="comments" :postId="postId" />
          </div>
        </div>
      </div>
      
      <!-- 侧边栏 -->
      <div class="md:col-span-1">
        <!-- 作者信息 -->
        <AuthorContent :author="author" />
        
        <!-- 相关帖子 -->
        <RelatedPostList :related-post-list="relatedPostList" />
      </div>
    </div>

    <BackTop />
  </div>
</template> 