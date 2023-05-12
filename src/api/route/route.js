import request from '@/utils/request'

// 上传路线封面图
export function uploadCoverImg(data) {
  return request({
    url: '/route/route/upload',
    method: "post",
    data: data
  })
}

// 查询路线列表
export function listRoute(query) {
  return request({
    url: '/route/route/list',
    method: 'get',
    params: query
  })
}

// 获取相应用户的路线
export function getUserRoute(userId) {
  return request({
    url: '/route/route/user/' + userId,
    method: 'get',
  })
}

// 查询发布路线列表
export function getRouteList() {
  return request({
    url: '/route/route/routeList',
    method: 'get'
  })
}

export function getListByDay(data) {
  return request({
    url: '/route/route/listByDay',
    method: 'post',
    data: data
  })
}

export function getListByPrice(data) {
  return request({
    url: '/route/route/listByPrice',
    method: 'post',
    data: data
  })
}

// 查询路线详细
export function getRoute(id) {
  return request({
    url: '/route/route/' + id,
    method: 'get'
  })
}

// 获取推荐路线列表
export function getRecRoute() {
  return request({
    url: '/route/route/home/route',
    method: 'get'
  })
}

// 获取用户路线数量
export function getUserRouteNum(userId) {
  return request({
    url: '/route/route/userRoute/' + userId,
    method: 'get'
  })
}

// 新增路线
export function addRoute(data) {
  return request({
    url: '/route/route',
    method: 'post',
    data: data
  })
}

// 修改路线
export function updateRoute(data) {
  return request({
    url: '/route/route',
    method: 'put',
    data: data
  })
}

// 删除路线
export function delRoute(id) {
  return request({
    url: '/route/route/' + id,
    method: 'delete'
  })
}

