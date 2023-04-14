import request from '@/utils/request'

// 查询景区收藏列表
export function listSpotFavorite(query) {
  return request({
    url: '/spotFavorite/spotFavorite/list',
    method: 'get',
    params: query
  })
}

// 查询景区收藏详细
export function getSpotFavorite(userId) {
  return request({
    url: '/spotFavorite/spotFavorite/' + userId,
    method: 'get'
  })
}

// 查询用户是否收藏景点
export function getIsFavorite(data) {
  return request({
    url: '/spotFavorite/spotFavorite/isFavorite',
    method: 'post',
    data: data
  })
}

// 新增景区收藏
export function addSpotFavorite(data) {
  return request({
    url: '/spotFavorite/spotFavorite',
    method: 'post',
    data: data
  })
}

// 修改景区收藏
export function updateSpotFavorite(data) {
  return request({
    url: '/spotFavorite/spotFavorite',
    method: 'put',
    data: data
  })
}

// 删除景区收藏
export function delSpotFavorite(userId) {
  return request({
    url: '/spotFavorite/spotFavorite/' + userId,
    method: 'delete'
  })
}

// 删除景点收藏
export function delFavorite(data) {
  return request({
    url: '/spotFavorite/spotFavorite/delFavorite',
    method: 'post',
    data: data
  })
}
