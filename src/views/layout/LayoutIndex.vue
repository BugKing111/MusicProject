<template>
  <!-- vue2+vant+axios实现网易云音乐-（练手项目，功能：推荐歌单、最新音乐、播放音乐，搜索，看评论） -->
    <div>
        <van-nav-bar :title="activeTitle" fixed />
        <div class="main">
            <!-- 二级路由-挂载点 -->
            <router-view></router-view>
            <!-- <router-link to="/play">是播放页吗</router-link> -->
        </div>
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
            <!-- <van-tabbar-item replace to="/login" icon="user-circle-o">登录</van-tabbar-item> -->
        </van-tabbar>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      activeTitle: this.$route.meta.title // "默认"顶部导航要显示的标题 (默认获取当前路由对象里的meta中title值)
    }
  },
  // 路由切换 - 侦听$route对象改变
  watch: {
    $route () {
      this.activeTitle = this.$route.meta.title // 提取切换后路由信息对象里的title显示
    }
  }
}

</script>

  <style scoped>
  /* 中间内容区域 - 容器样式(留好上下导航所占位置) */
  .main {
    padding-top: 46px;
    padding-bottom: 545px;
    background-color: #fff;
  }
  </style>
