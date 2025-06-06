// 单个活动的定义
export interface Activity {
  id: string,
  title: string,
  date: string,
  location: string,
  image: string,
  participants: number,
  hasJoined?: boolean // 是否已参加 登录才有
}

// 已参加 or 取消参加
export interface JoinParams {
  id: string // 活动id
  isJoin: boolean  // 传true 参加 传false 取消参加
}

// 精选推荐的单个帖子定义
export interface Recommendations {
  id: string,
  title: string,
  authorName: string,
  likes: number,
  views: number
}

