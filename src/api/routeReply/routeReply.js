import request from '@/utils/request'

// 查询路线回复列表
export function listRouteReply(query) {
  return request({
    url: '/routeReply/routeReply/list',
    method: 'get',
    params: query
  })
}

// 查询路线回复详细
export function getRouteReply(id) {
  return request({
    url: '/routeReply/routeReply/' + id,
    method: 'get'
  })
}

// 新增路线回复
export function addRouteReply(data) {
  return request({
    url: '/routeReply/routeReply',
    method: 'post',
    data: data
  })
}

// 修改路线回复
export function updateRouteReply(data) {
  return request({
    url: '/routeReply/routeReply',
    method: 'put',
    data: data
  })
}

// 删除路线回复
export function delRouteReply(id) {
  return request({
    url: '/routeReply/routeReply/' + id,
    method: 'delete'
  })
}
