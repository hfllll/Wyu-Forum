<script setup lang="ts">
import { getPostDetail } from '@/api'
import type { PostData, RelatedPosts, SonComment, Author } from '@/types'
import { onActivated, ref } from 'vue'
import { useRoute } from 'vue-router'
import PostContent from '@/components/Post/PostContent.vue'
import AuthorContent from '@/components/Post/AuthorContent.vue'
import RelatedPostList from '@/components/Post/RelatedPostList.vue'

const route = useRoute()
const postId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id


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
const comments = ref<SonComment[]>([
  {
    id: '1',
    author: '代码爱好者',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    content: '非常实用的建议，我特别认同第4点，适当休息真的很重要！',
    likes: 8,
    createdAt: '2024-05-01 15:45',
    replies: [],
    userId: '132'
  },
  {
    id: '2',
    author: '新手程序员',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    content: '请问有什么推荐的IDE插件可以提高效率吗？',
    likes: 3,
    createdAt: '2024-05-01 16:20',
    userId: '123',
    replies: [
      {
        id: '21',
        userId: 'string',
        author: '编程达人',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        content: '对于VS Code，我推荐Prettier（代码格式化）、GitLens（Git增强）和Bracket Pair Colorizer（括号着色）等插件。',
        likes: 5,
        createdAt: '2024-05-01 16:35',
        replies: []
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
    createdAt: '2024-05-01 17:10',
    replies: []
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

const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      id: (comments.value.length + 1).toString(),
      userId: '345',
      author: '当前用户',
      avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
      content: newComment.value,
      likes: 0,
      createdAt: '刚刚',
      replies: []
    })
    newComment.value = ''
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

onActivated(async () => {
  await Promise.all([fetchDetail()])
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
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="用户头像" />
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
                    <button @click="submitComment" class="btn btn-primary">发表评论</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <!-- 评论列表 -->
            <div class="space-y-6 mt-4">
              <div v-for="comment in comments" :key="comment.id" class="border-b border-base-300 pb-4">
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
                        <span class="text-sm text-base-content/60 ml-2">{{ comment.createdAt }}</span>
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
                      <button class="btn btn-ghost btn-xs">回复</button>
                    </div>
                    
                    <!-- 回复列表 -->
                    <div v-if="comment.replies" class="mt-4 pl-4 border-l-2 border-base-300">
                      <div v-for="reply in comment.replies" :key="reply.id" class="mt-3">
                        <div class="flex items-start gap-3">
                          <div class="avatar">
                            <div class="w-8 h-8 rounded-full">
                              <img :src="reply.avatar" alt="用户头像" />
                            </div>
                          </div>
                          <div class="flex-1">
                            <div class="flex justify-between">
                              <div>
                                <span class="font-medium">{{ reply.author }}</span>
                                <span class="text-sm text-base-content/60 ml-2">{{ reply.createdAt }}</span>
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
                              <button class="btn btn-ghost btn-xs">回复</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  </div>
</template> 