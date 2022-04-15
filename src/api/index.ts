import request from "@/api/request";

// 获取轮播图
/**
 * @param type 0: pc 1: android 2: iphone 3: ipad
 */
export const getBanner = (type: number | string): Promise<any> => request.get(`/banner?type=${type}`)

// 获取龙珠
export const getDragonBall = (): Promise<any> => request.get("/homepage/dragon/ball")

// 获取推荐歌单
export const getPersonalized = (n: number | string): Promise<any> => request.get(`/personalized?limit=${n}`)

// 获取歌单列表
export const getPlayList = (id: number | string): Promise<any> => request.get(`/playlist/detail?id=${id}`)

// 获取歌词
export const getLrc = (id: number | string): Promise<any> => request.get(`/lyric?id=${id}`)

// 登录接口
export const loginApi = (req: any): Promise<any> => request.post("/login", { email: req.email, password: req.password })

// 搜索歌曲
export const searchApi = (str: string | number): Promise<any> => request.get(`/cloudsearch?keywords=${str}`)

// 获取推荐搜索关键词
/**
 * 
 * @param str 关键词
 * @param type mobile pc
 * @returns 
 */
export const getSuggestApi = (str: string | number, type: string): Promise<any> => {
  return request.get(`/search/suggest?keywords=${str}&type=${type}`)
}

// 获取用户信息，携带cookie
export const getUserInfo = (cookie: string): Promise<any> => request.get(`/user/account?cookie=${cookie}`)

// 获取用户歌单，携带cookie
export const getUserPlayList = (id: number | string, cookie: string): Promise<any> => {
  return request.get(`/user/playlist?uid=${id}&cookie=${cookie}`)
}