// 话题相关内容
export interface Topic{
  id: string,  // id
  title: string, // 标题
  description: string, // 描述
  posts: number, // 帖子数量
  follows: number, // 关注着数量
  hasFollowed?: boolean // 号主是否已关注 没token不返回这个
}

// 关注的请求参数
export interface FollowParams {
  id: string 
  isFollow: boolean // 传true变为关注 传false取消关注
}

// 搜索话题的请求参数
export interface TopicSearchParams {
  keyword: string
}

// 查询对应ID的话题的详情信息
export interface TopicParams {
  topicId?: string,
  keyword?: string
}
