import request from '@/utils/request'

// 查询路线Tag列表
export function listRouteTag(query) {
  return request({
    url: '/route/routeTag/list',
    method: 'get',
    params: query
  })
}

// 查询路线Tag详细
export function getRouteTag(id) {
  return request({
    url: '/route/routeTag/' + id,
    method: 'get'
  })
}

// 新增路线Tag
export function addRouteTag(data) {
  return request({
    url: '/route/routeTag',
    method: 'post',
    data: data
  })
}

// 修改路线Tag
export function updateRouteTag(data) {
  return request({
    url: '/route/routeTag',
    method: 'put',
    data: data
  })
}

// 删除路线Tag
export function delRouteTag(id) {
  return request({
    url: '/route/routeTag/' + id,
    method: 'delete'
  })
}
