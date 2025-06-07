export  interface UserInfo {
  id: string
  name: string
  avatar: string
  token:string
}

export interface LoginParams {
  phone: string
  password: string
}

export interface LoginResponse extends UserInfo {
  
}

// 个人 页面资料
export interface UserProfile {
  name: string
  avatar: string
  joinDate: string // 加入时间 xxxx-xx-xx
  bio: string,
  postCount: number, // 发帖数量
  likeCount: number, // 点赞数量
  fanCount: number, // 粉丝数量
  isFollowed: boolean // 是否关注了
  identify: string // 身份或者等级是什么
}

// 获取个人信息接口的传递参数
export interface ProfileParams {
  userId: string
}
