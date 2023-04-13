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
