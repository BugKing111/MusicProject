import request from '../utils/request'

// 喜欢音乐
export function addLike (id) {
  return request({
    url: '/like?id=' + id,
    method: 'get'
  })
}
// export function addLike (id) {
//   return request({
//     url: '/album/sub?id= ' + id,
//     method: 'get'
//   })
// }
