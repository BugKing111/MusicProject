import request from '@/utils/request'

export const getComment = params => request({
  url: '/comment/music',
  params
})
