<template>
  <van-cell
    :title="name"
    :label="author + name"
    @click="$router.push({ path: '/comment', query: { id: id } })"
  >
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <template #right-icon>
      <van-icon name="play-circle" @click="playFn" size="25px" />
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'SongItem',
  props: {
    name: String,
    author: String,
    id: Number
  },
  methods: {
    playFn () {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
