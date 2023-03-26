import request from '@/utils/request'

// 查询路线收藏列表
export function listRouteFavorite(query) {
  return request({
    url: '/routeFavorite/routeFavorite/list',
    method: 'get',
    params: query
  })
}

// 查询路线收藏详细
export function getRouteFavorite(userId) {
  return request({
    url: '/routeFavorite/routeFavorite/' + userId,
    method: 'get'
  })
}

// 新增路线收藏
export function addRouteFavorite(data) {
  return request({
    url: '/routeFavorite/routeFavorite',
    method: 'post',
    data: data
  })
}

// 修改路线收藏
export function updateRouteFavorite(data) {
  return request({
    url: '/routeFavorite/routeFavorite',
    method: 'put',
    data: data
  })
}

// 删除路线收藏
export function delRouteFavorite(userId) {
  return request({
    url: '/routeFavorite/routeFavorite/' + userId,
    method: 'delete'
  })
}
