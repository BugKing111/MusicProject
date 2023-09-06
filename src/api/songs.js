/*
 * Copyright (c) chb my copyright message. 2022-2023. All rights reserved.
 *
 */

import request from '@/utils/request'

// 获取音乐的url
export function getSongUrl (id) {
  return request({
    url: `/song/url/${id}`,
    // url: '/song/url?id=' + id,
    method: 'get'
  })
}

// 获取歌曲详情
export function getSongDetail (ids) {
  return request({
    // url: `/song/detail/${id}`,
    url: '/song/detail?ids=' + ids,
    method: 'get'
  })
}
// 获取歌词
export function getSonglyricById (id) {
  return request({
    url: '/lyric?id=' + id,
    method: 'get'
  })
}
// 获取专辑内容
export function getAlbum (id) {
  return request({
    url: '/album?id=' + id,
    method: 'get'
  })
}
