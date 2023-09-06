<template>
  <div class="play">
    <div>
      <van-nav-bar title="播放详情" fixed left-arrow @click-left="$router.back()"></van-nav-bar>
    </div>
    <div class="wrap">
      <div class="audio-view"
      v-for="item in detailList" :key="item.id">
      <!-- <img :src="item.al.picUrl" alt=""> -->
      <van-image
        round
        width="300px"
        margin: auto
        :src="item.al.picUrl"
        />
      <p>{{ item.name }}</p>
      <div @click="addLike">
        <van-icon name="like-o" size="18" />
      </div>
      <div class="lyric">
      </div>
      <!-- {{ lyricList.lrc }} -->
    </div>
    <!-- aotoplay自动播放 -->
    <audio
      autoplay
      class="player"
      controls
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    ></audio>
    </div>
  </div>
</template>

<script>
import { addLike } from '@/api/like'
import { getSonglyricById, getSongDetail } from '@/api/songs'
export default {
  data () {
    return {
      lyricList: {}, // 歌词部分
      detailList: '', // 信息部分
      id: this.$route.query.id // 上一页传过来的音乐id
    }
  },
  // computed: {
  //   // 歌词分割处理
  //   lyric: function(){
  //     const arr
  //     if (this.lyricList.lrc){
  //      const arr = this.lyricList.lrc.split(/[(\f\n)\r\t\v]/).map((item,i) => {
  //         const min = item.slice(1,3)
  //       })
  //       console.log(min)
  //     }
  //   }
  // },
  methods: {
    // 加入喜欢
    addLike () {
      addLike(this.id).then(response => {
        console.log(response)
      })
    },
    // 歌词分割
    _formatLyr (lrc) {
      // 可以看network观察歌词数据是一个大字符串, 进行拆分.
      const reg = this.lyricList.lrc.split(/[(\f\n)\r\t\v]/)
      const timeArr = lrc.match(reg) // 匹配所有[]字符串以及里面的一切内容, 返回数组
      console.log(timeArr) // ["[00:00.000]", "[00:01.000]", ......]
      const contentArr = lrc.split(/\[.+?\]/).slice(1) // 按照[]拆分歌词字符串, 返回一个数组(下标为0位置元素不要,后面的留下所以截取)
      console.log(contentArr)
      const lyricList = {} // 保存歌词的对象, key是秒, value是显示的歌词
      timeArr.forEach((item, index) => {
        // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
        const ms = item.split(':')[0].split('')[2] * 60
        // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
        const ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        // 秒数作为key, 对应歌词作为value
        lyricList[ms + Number(ss)] = contentArr[index]
      })
      // 返回得到的歌词对象(可以打印看看)
      console.log(lyricList)
      return lyricList
    },
    // 获取歌词
    getSongLyric () {
      getSonglyricById(this.id).then(response => {
        // console.log(response)
        console.log(response.data.lrc)
        this.lyricList = response.data
      })
    },
    getSongDetail () {
      getSongDetail(this.id).then(response => {
      // console.log(response)
        this.detailList = response.data.songs
      })
    }
  },
  // created () {
  //   // this.getSongUrl()
  //   this.getSongLyric()
  // },
  mounted () {
    this.getSongLyric()
    this.getSongDetail()
  }
}
</script>

<style lang="less" scoped>
/* .play {
  width: 100%;
  background-color: aqua;
} */
.play > .wrap {
  display: block;
  padding-top: 55px;
  /* width: 1200px; */
  margin: auto;
  text-align: center;
  /* margin-top: 48px; */
  background-color: pink;
}
.lyric {
  height: 180px;
}
</style>
