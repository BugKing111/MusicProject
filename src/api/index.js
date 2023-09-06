// 统一出口
// 你也可以在逻辑页面里.vue中直接引入@/api/Home下的网络请求工具方法
// 为什么: 我们可以把api所有的方法都统一到一处.
// 首页 - 推荐歌单

import { recommendMusic, newMusic } from '@/api/Home'
import { hotSearch, searchResult } from '@/api/Search'
import { getComment } from '@/api/Comment'

export const recommendMusicAPI = recommendMusic // 把网络请求方法拿过来 导出
export const newMusicAPI = newMusic // 把获取最新音乐的, 网络请求方法导出

export const hotSearchAPI = hotSearch // 热搜
export const searchResultAPI = searchResult // 搜索结果

export const getCommentAPI = getComment // 获取评论
