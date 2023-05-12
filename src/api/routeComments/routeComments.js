import request from '@/utils/request'

// 查询路线评论列表
export function listRouteComments(query) {
  return request({
    url: '/routeComments/routeComments/list',
    method: 'get',
    params: query
  })
}

// 查询路线评论详细
export function getRouteComments(id) {
  return request({
    url: '/routeComments/routeComments/' + id,
    method: 'get'
  })
}

// 查询指定路线的评论列表
export function getRouteCommentsList(routeId) {
  return request({
    url: '/routeComments/routeComments/list/' + routeId,
    method: 'get'
  })
}

// 查询路线评论详细
export function getUserComments(userId) {
  return request({
    url: '/routeComments/routeComments/user/' + userId,
    method: 'get'
  })
}

// 获取用户评论数量
export function getUserCommentsNum(userId) {
  return request({
    url: '/routeComments/routeComments/userComments/' + userId,
    method: 'get'
  })
}

// 新增路线评论
export function addRouteComments(data) {
  return request({
    url: '/routeComments/routeComments',
    method: 'post',
    data: data
  })
}

// 修改路线评论
export function updateRouteComments(data) {
  return request({
    url: '/routeComments/routeComments',
    method: 'put',
    data: data
  })
}

// 删除路线评论
export function delRouteComments(id) {
  return request({
    url: '/routeComments/routeComments/del/' + id,
    method: 'delete'
  })
}
