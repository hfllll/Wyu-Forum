<script setup lang="ts">
import { GetComments,  getPostDetail, SetComment } from '@/api'
import type { PostData, RelatedPosts,  Author, FatherComment } from '@/types'
import { onActivated, ref } from 'vue'
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
const post = ref<PostData>({
  id: postId,
  title: '如何提高编程效率？',
  author: '编程达人',
  avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  content: `作为一名程序员，提高编程效率是非常重要的。以下是我的一些经验分享：

1. **掌握快捷键**：熟悉你的IDE或编辑器的快捷键，可以大大提高编码速度。

2. **代码片段**：创建常用的代码片段，避免重复编写相同的代码。

3. **使用版本控制**：Git等版本控制工具可以帮助你更好地管理代码，避免意外丢失。

4. **合理休息**：适当的休息可以保持大脑清醒，反而能提高整体效率。

5. **持续学习**：学习新的技术和方法，不断优化你的工作流程。

希望这些建议对大家有所帮助！`,
  tags: ['编程', '效率', '工具'],
  likes: 42,
  comments: 15,
  views: 256,
  createdAt: '2024-05-01 14:30',
  isCollected: false,
  authorID: '123'
})


// 模拟评论数据
const comments = ref<FatherComment[]>([
  {
    id: '1',
    author: '代码爱好者',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    content: '非常实用的建议，我特别认同第4点，适当休息真的很重要！',
    likes: 8,
    createTime: '2024-05-01 15:45',
    commentCounts: 1,
    commentList: [],
    userId: '132'
  },
  {
    id: '2',
    author: '新手程序员',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    content: '请问有什么推荐的IDE插件可以提高效率吗？',
    likes: 3,
    createTime: '2024-05-01 16:20',
    userId: '123',
    commentCounts: 4,
    commentList: [
      {
        id: '21',
        userId: 'string',
        author: '编程达人',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '对于VS Code，我推荐Prettier（代码格式化）、GitLens（Git增强）和Bracket Pair Colorizer（括号着色）等插件。',
        likes: 5,
        createTime: '2024-05-01 16:35',
        count: null,
        commentCounts: 9
      }
    ]
  },
  {
    id: '3',
    userId: '123',
    author: '资深开发',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    content: '我还想补充一点，定期重构代码也很重要，可以提高代码质量和可维护性。',
    likes: 12,
    createTime: '2024-05-01 17:10',
    commentCounts: 3,
    commentList: [
      {
        id: '21',
        userId: 'string',
        author: '编程达人',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '对于VS Code，我推荐Prettier（代码格式化）、GitLens（Git增强）和Bracket Pair Colorizer（括号着色）等插件。',
        likes: 5,
        createTime: '2024-05-01 16:35',
        count: null,
        commentCounts: 9
      }
    ]
  }
])

// 关联的帖子
const relatedPostList = ref<RelatedPosts[]>([
  { postId: '101', title: '10个提高代码质量的技巧' },
  { postId: '102', title: '程序员必备的5个工具' },
  { postId: '103', title: '如何避免编程中的常见错误' }
])



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

const fetchDetail = async () => {
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

// // 获取更多评论
// const fetchMoreComment = async () => {
//    const { data } = await GetMoreComments({
//     commentId: comments.value[0].id
//    })
// }

onActivated(async () => {
  newComment.value = ''
  isComment.value = false
  await Promise.all([fetchDetail(), fetchComment()])
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
            
            <div class="divider"></div>
            
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