import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/LayoutIndex'
import Home from '@/views/home/HomeIndex'
import SearchIndex from '@/views/search/SearchIndex'
import PlayIndex from '@/views/play/PlayIndex'
import CommentIndex from '@/views/comment/CommentIndex'
// import LoginIndex from '@/views/login/LoginIndex'
// import HomeView from '@/views/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/layout',
    component: Layout,
    // redirect: '/layout/home',
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          // meta保存路由对象额外信息的
          title: '首页'
        }
      },
      {
        path: '/search',
        component: SearchIndex,
        meta: {
          title: '搜索'
        }
      }
      // {
      //   path: '/login',
      //   component: LoginIndex,
      //   meta: {
      //     title: '登录'
      //   }
      // }
    ]
  },
  // 播放音乐页面
  {
    path: '/play',
    component: PlayIndex
  },
  // 评论
  {
    path: '/comment',
    component: CommentIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
