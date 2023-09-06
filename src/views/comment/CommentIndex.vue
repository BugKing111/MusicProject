<template>
  <div>
    <van-nav-bar title="评论" fixed left-arrow @click-left="$router.back()" />
    <div>
      <div class="main">
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in list" :key="index">
              <div class="wrap">
                <div class="img_wrap">
                  <img :src="item.user.avatarUrl" alt="" />
                </div>
                <div class="conent_wrap">
                  <div class="header_wrap">
                    <div class="info_wrap">
                      <p>{{ item.user.nickname }}</p>
                      <p>{{ item.time }}</p>
                    </div>
                    <div>{{ item.likedCount }}点赞</div>
                  </div>
                  <div class="footer_wrap">
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import { getCommentAPI } from '@/api'
export default {
  name: 'CommentIndex',
  data () {
    return {
      id: this.$route.query.id,
      commentsInfo: [], // 每次接收20个评论数据
      page: 1, // 页码
      loading: false, // 下拉加载状态
      finished: false, // 所有数据是否加载完成状态
      refreshing: true, // 上拉加载状态
      list: [] // 所有数据
    }
  },
  methods: {
    // 获取数据
    async getList () {
      const getComment = await getCommentAPI({
        id: this.id,
        type: 1,
        limit: 20,
        offset: (this.page - 1) * 20
      })
      console.log(getComment.id)
      // this.commentsInfo = getComment.data.hotComments
      console.log(getComment)
      this.list = getComment.data.comments
      this.commentsInfo.forEach((obj) => this.list.push(obj))
      this.loading = false
    },

    // 上拉刷新
    async onLoad () {
      // console.log(this.list.length)
      if (this.loading) {
        this.getList()
        this.page++
        this.refreshing = false
      }

      if (this.list.length % 20 !== 0) {
        this.loading = false
        this.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      this.finished = false
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

  <style scoped>
.main {
  padding-top: 46px;
}
.wrap {
  display: flex;
}
.img_wrap {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.266667rem;
}
.img_wrap img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.conent_wrap {
  flex: 1;
}
.header_wrap {
  display: flex;
}
.info_wrap {
  flex: 1;
}
.info_wrap p:first-child {
  font-size: 0.373333rem;
  color: #666;
}
.info_wrap p:last-of-type {
  font-size: 0.24rem;
  color: #999;
}
.header_wrap div:last-of-type {
  color: #999;
  font-size: 0.293333rem;
}
.footer_wrap {
  font-size: 0.4rem;
  color: #333;
}
</style>
