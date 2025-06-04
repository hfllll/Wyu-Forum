<script lang="ts" setup>
import { defineProps, ref, useTemplateRef } from 'vue'
import type { FatherComment } from '@/types'
import { GetMoreComments, SetComment } from '@/api';
import { v4 as uuidv4 } from 'uuid'
import { onClickOutside } from '@vueuse/core'
import Swal from 'sweetalert2'

interface ComItemProps {
  comment: FatherComment
  postId: string
  avatar: string | undefined
}

const props = defineProps<ComItemProps>()


const isMore = ref<boolean>(false)
const isFirstOpen = ref<boolean>(true)
const isReply = ref<boolean>(false)
const isPush = ref<boolean>(false)
const replyMes = ref<string>('')
const target = useTemplateRef<HTMLElement>('target')

onClickOutside(target, () => isReply.value = false)

const handleMore = async (comment: FatherComment) => {  
  isMore.value = true
  const  { data } = await GetMoreComments({ commentId: comment.id })

  // 即可的加入操作
  comment.commentList.push(...data)
  isMore.value = false
  isFirstOpen.value = false

}

const handleComment = async () => {
  isReply.value = true
  replyMes.value = ''
}

const pushComment = async () => {
  isPush.value = true
  await SetComment({
    parentId: props.comment.id,
    commentContent: replyMes.value,
    postId: props.postId,
    level: 2 //如果是一级评论传1 二级评论传2
  })
  // if (res.code === 200){
    props.comment.commentList.unshift({
      id: uuidv4(),
      userId: uuidv4(),
      avatar: props.avatar as string,
      author: '你',
      content: replyMes.value,
      likes: 0,
      count: 0,
      commentCounts: 0,
      createTime: '刚刚'
    })
    Swal.fire({
      title: '发布评论成功！',
      text: replyMes.value,
      icon: 'success',
      confirmButtonText: '中！',
      theme: 'borderless'
    })
  // }
  isPush.value = false
  replyMes.value = ''
  isReply.value = false
}

</script>

<template>
  <div class="flex items-start gap-3">
    <div class="avatar">
      <div class="w-10 h-10 rounded-full">
        <img :src="comment.avatar" alt="用户头像" />
      </div>
    </div>
    <div class="flex-1">
      <div class="flex justify-between">
        <div>
          <span class="font-medium">{{ comment.author }}</span>
          <span class="text-sm text-base-content/60 ml-2">{{ comment.createTime }}</span>
        </div>
        <button class="btn btn-ghost btn-xs btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      <p class="mt-1">{{ comment.content }}</p>
      <div class="flex items-center mt-2 space-x-4">
        <button class="btn btn-ghost btn-xs gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          {{ comment.likes }}
        </button>
        <button class="btn btn-ghost btn-xs" @click="handleComment()">评论</button>
        <div v-if="comment.commentCounts > 1 && isFirstOpen"> 
          <!-- 如果有超过一条的回复 -->
          <button v-show="!isMore" @click="handleMore(comment)"  class="btn btn-outline btn-xs btn-info">展开更多</button>
          <button v-show="isMore" @click="handleMore(comment)"  class="btn btn-soft btn-primary btn-xs " disable>加载中 <span class="loading loading-dots loading-xs" /> </button>
        </div>
      </div>
      
      <!-- 回复列表 -->
      <div v-if="comment.commentList" class="mt-4 pl-4 border-l-2 border-base-300">
        <div v-for="reply in comment.commentList" :key="reply.id" class="mt-3">
          <div class="flex items-start gap-3">
            <div class="avatar">
              <div class="w-8 h-8 rounded-full">
                <img :src="props.avatar" alt="用户头像" />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <div>
                  <span class="font-medium">{{ reply.author }}</span>
                  <span class="text-sm text-base-content/60 ml-2">{{ reply.createTime  }}</span>
                </div>
              </div>
              <p class="mt-1">{{ reply.content }}</p>
              <div class="flex items-center mt-2 space-x-4">
                <button class="btn btn-ghost btn-xs gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {{ reply.likes }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 回复框 -->
      <div class="ml-8 mt-4 animate__animated animate__jello" v-show="isReply" ref="target">
        <div class="mb-3">
          <div class="avatar mr-5 mb-1">
            <div class="ring-info ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
              <img :src="avatar" />
            </div>
          </div>
          <textarea :placeholder="`回复 @${comment.author}:`" class="textarea textarea-info min-h-2" v-model="replyMes" ></textarea>
        </div>
        <!-- <div> -->
          <button v-show="!isPush" class="btn btn-info btn-sm" @click="pushComment">发布评论</button>
          <button v-show="isPush" class="btn btn-secondary btn-sm" @click="pushComment">发布中
            <span class="loading loading-spinner loading-md" />
          </button>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>