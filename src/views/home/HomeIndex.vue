<template>
  <div>
    <p class="title">推荐歌单</p>
    <div class="song_name">
      <van-row gutter="5">
        <van-col span="8" v-for="obj in recommendList" :key="obj.id">
          <van-image fit="cover" :src="obj.picUrl" height="100px" width="100%" />
          <p class="song_name">{{ obj.name }}</p>
        </van-col>
      </van-row>
    </div>
    <p class="title">最新音乐</p>
    <SongItem v-for="item in songList"
    :key="item.id"
    :name="item.name"
    :author="item.song.artists[0].name"
    :id="item.id"></SongItem>

    <!-- <van-cell center v-for="item in songList" :key="item.id"
      :title="item.name"
      :label="item.song.artists[0].name + ' - ' + item.name"
      :id="item.id"
      @click="$router.push({ path: '/comment', query: { id: id } })">
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.6rem"/>
        </template>
    </van-cell> -->
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  props: {
    name: String,
    author: String,
    id: Number
  },
  data () {
    return {
      recommendList: [], // 推荐歌单数据
      songList: [] // 最新音乐数据
    }
  },
  components: {
    SongItem
  },
  async created () {
    const res = await recommendMusicAPI({
      limit: 6
    })
    // console.log(res)
    this.recommendList = res.data.result

    const res2 = await newMusicAPI({
      limit: 10
    })
    // console.log(res2)
    this.songList = res2.data.result
  }
}
</script>
<style>
/* 标题 */
.title {
  padding: 10px 15px;
  margin: -1px 0 10px 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  padding-bottom: 37px;
  font-size: 14px;
  margin-bottom: 20px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.van-col {
    height: 185px;
    float: left;
    box-sizing: border-box;
    min-height: 1px;
}
</style>
