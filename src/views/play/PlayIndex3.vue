<!--
  Copyright (c) chb my copyright message. 2022-2023. All rights reserved.

  -->

  <template>
    <div class="musicPlayBack"
         :style="{backgroundImage: 'url(' +images +')'  }">
    <van-nav-bar style="background-color: transparent;position: relative;z-index: 4;height: 50px;color: white">
        <template #left>
          <van-icon @click="$router.back()" name="xiajiantou" size="18" class-prefix="iconfont"/>
        </template>
        <template #title>
          <div style="font-size: 18px;margin-top: 8px;color: white">{{ data.name }}</div>
          <div style="font-size: 12px;color: #666">{{ article }}></div>
        </template>
        <template #right>
          <van-icon name="fenxiang" size="18" class-prefix="iconfont"/>
        </template>
      </van-nav-bar>
      <!-- 中间图片   -->
      <div
        style="display: flex;position: relative;z-index: 3;justify-content: center;align-items: center;padding: 150px 0">
        <div
          style="text-align: center;background-color: #101012;width: 200px;height: 200px;border-radius: 50%;">
          <img :src="images" :class="musicState==='true'?'img1':'img2'"
               style="width: 140px;height:140px;border-radius: 50%;line-height: 200px;margin-top: 30px">
        </div>
      </div>
      <div
        style="color: white;z-index: 4;position: relative;display: flex;justify-content: space-around;align-items: center">
        <div @click="addLike">
          <van-icon v-if="data.no!==0" name="shoucang1" size="18"
                    class-prefix="iconfont"/>
          <van-icon v-else name="daohangshoucangyishoucang" size="18" class-prefix="iconfont" color="#fe373a"/>
        </div>
        <van-icon name="xiazaidaoru" size="28" class-prefix="iconfont"/>
        <van-icon name="heijiaochangpianji" size="28" class-prefix="iconfont"/>
        <van-icon name="comment" size="28" :badge="data.mark" @click="$router.push({name:'comment',query:{id:id}})"
                  class-prefix="iconfont"/>
        <van-icon name="gengduo-shuxiang" size="28" class-prefix="iconfont"/>
      </div>
      <!--  布进器  -->
      <div style="display: flex;position: relative;z-index: 4;align-items: center">
        <div style="font-size: 18px;color: white">{{ currentTime }}</div>
        <van-slider v-model="audio" @change="onChange" button-size="12px" style="margin-left: 10px"
                    :max="maxTime"></van-slider>
        <div style="font-size: 18px;color: white">{{ endTime }}</div>
      </div>
      <div
        style="color: white;position: relative;z-index: 3;display: flex;margin-top: 22px;justify-content: space-around;align-items: center;">
        <div>
          <van-icon :name="shunxubofang" size="22" class-prefix="iconfont"/>
        </div>
        <van-icon name="shangyishoushangyige" size="28" class-prefix="iconfont"/>
        <van-icon :name="zanting" size="46" @click="startOrStop" class-prefix="iconfont"/>
        <van-icon name="xiayigexiayishou" size="28" class-prefix="iconfont"/>
        <van-icon name="24gl-playlistMusic" size="28" class-prefix="iconfont"/>
      </div>
    </div>
  </template>
<script>
import { addLike } from '../api/like'
import { getSongDetail, getSongUrl } from '../api/song'

export default {
  name: 'musicPlayBack',
  data () {
    return {
      id: '',
      data: {},
      audio: 0, // 音频播放的位置和音频的时间
      maxTime: 100, // 最大值
      shunxubofang: 'shunxubofang',
      zanting: 'zanting',
      audioUrl: '',
      currentTime: '00:00',
      endTime: '00:00',
      images: '',
      article: ''
    }
  },
  computed: {
    musicState () {
      return this.$store.state.playMusics.state
    }
  },
  created () {
    this.id = this.$route.query.id
    // 获取歌曲详情
    getSongDetail(this.id).then(res => {
      this.data = res.data.songs[0]
      this.images = this.data.al.picUrl
      this.article = this.data.ar[0].name
      const data = {
        images: this.images,
        title: this.data.name,
        author: this.article
      }
      this.$store.dispatch('changePlayMusics', data)
    })
    this.init()
  },
  methods: {
    // 初始化音乐并开始播放
    init () {
      const self = this
      getSongUrl(this.id).then(res => {
        this.audioUrl = res.data.data[0].url
        this.$store.dispatch('changeAudio', res.data.data[0].url)
        this.$store.dispatch('changeMusicState', 'true')
        this.$store.state.musicAudio.music.play()
        this.musicLength()
        const music = this.$store.state.musicAudio.music
        // 获取进度条时间
        music.addEventListener('loadedmetadata', () => {
          setInterval(function () {
            const month = Math.floor(music.currentTime / 60) < 10 ? '0' + Math.floor(music.currentTime / 60) : Math.floor(music.currentTime / 60)
            const secomds = Math.floor(music.currentTime % 60 % 60) < 10 ? '0' + Math.floor(music.currentTime % 60 % 60) : Math.floor(music.currentTime % 60 % 60)
            self.currentTime = month + ':' + secomds
            self.audio = music.currentTime
            self.maxTime = music.duration
          }, 1000)
        })
      })
    },
    // 加入喜欢
    addLike () {
      const like = true
      //   const that = this
      addLike(this.id, like).then(res => {
      })
    },
    // 切换播放状态
    startOrStop () {
      if (this.musicState === 'true') {
        // 暂停
        this.$store.state.musicAudio.music.pause()
        this.$store.dispatch('changeMusicState', 'false')
        this.zanting = 'bofang'
      } else {
        this.zanting = 'zanting'
        this.$store.state.musicAudio.music.play()
        this.$store.dispatch('changeMusicState', 'true')
      }
    },
    // 获取结束时间
    musicLength () {
      this.$store.dispatch('changeTotalTime', this.$store.state.playMusics.length)
      this.endTime = this.$store.state.playMusics.totalDivide + ':' + this.$store.state.playMusics.totalSecond
    },
    // 进度条拖动变化
    onChange (value) {
      this.audio = value
      this.$store.state.musicAudio.music.currentTime = value
      // 如果当前为暂停状态
      if (this.musicState === 'false') {
        this.zanting = 'zanting'
        this.$store.state.musicAudio.music.play()
        this.$store.dispatch('changeMusicState', 'true')
      }
    }
  }
}
</script>
  <style scoped lang="less">
  .musicPlayBack {
    z-index: 1;
    position: relative;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    .bottomToggle {
      position: fixed;
      height: 60px;
      bottom: 0;
    }
  }
  .musicPlayBack:before {
    content: "";
    width: 100%;
    height: 100%;
    z-index: 2;
    filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
    background: inherit;
  }
  .img1 {
    animation: rotateImg 10s linear infinite;
    animation-play-state: running;
  }
  .img2 {
    animation-play-state: paused;
  }
  .paused {
    animation-play-state: paused;
  }
  @keyframes rotateImg {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  </style>
