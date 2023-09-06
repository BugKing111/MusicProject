<template>
    <div>
      <van-search v-model="SearchValue" placeholder="请输入搜索关键词" shape="round" style="position: fixed;width: 100%;"/>
      <div class="search_wrap" v-if="this.resultList.length===0">
        <!-- 标题 -->
        <p class="hot_title">热门搜索</p>
        <!-- 热搜关键词容器 -->
        <div class="hot_name_wrap">
          <!-- 每个搜索关键词 -->
          <span v-for="(obj,index) in SearchList" :key="index" class="hot_item"
                @click="btn(obj.first)"> {{ obj.first }}</span>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="hot_search" v-else>
        <!-- 标题 -->
        <p class="hot_title">最佳匹配</p>
        <SongItem  v-for="obj in resultList" :key="obj.id"
                   :name="obj.name"
                   :author="obj.ar[0].name +obj.name"
                   :id="obj.id"/>
      </div>
    </div>
  </template>

<script>
import { hotSearchAPI, searchResultAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  data () {
    return {
      SearchValue: '',
      SearchList: [],
      resultList: [],
      timer: null
    }
  },
  components: {
    SongItem
  },
  async created () {
    const res = await hotSearchAPI()
    console.log(res)
    this.SearchList = res.data.result.hots
  },
  methods: {
    async btn (first) {
      this.SearchValue = first
      const res = await searchResultAPI({
        type: 1,
        keywords: this.SearchValue
      })
      this.resultList = res.data.result.songs
      setTimeout(() => {
        clearTimeout(this.timer)
      })
    }
  },
  watch: {
    SearchValue (val) {
      clearTimeout(this.timer)
      if (val.length !== 0) {
        this.timer = setTimeout(async () => {
          const res = await searchResultAPI({
            type: 1,
            keywords: this.SearchValue
          })
          this.resultList = res.data.result.songs
        }, 300)
      }
    }
  }
}
</script>
  <style scoped>
  /* 搜索容器的样式 */
  .search_wrap {
    padding: 0.266667rem;
  }
  /*热门搜索文字标题样式 */
  .hot_title {
    font-size: 16px;
    color: #666;
  }
  /* 热搜词_容器 */
  .hot_name_wrap {
    margin: 5px 0;
  }
  /* 热搜词_样式 */
  .hot_item {
    display: inline-block;
    height: 22px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 22px;
    color: #333;
    border-color: #d3d4da;
    border-radius: 45px;
    border: 1px solid #d3d4da;
  }
  /* 给单元格设置底部边框 */
  .van-cell {
    border-bottom: 1px solid lightgray;
  }
  </style>
