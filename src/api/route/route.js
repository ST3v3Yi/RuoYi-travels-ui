import request from '@/utils/request'

// 上传路线封面图
export function uploadCoverImg(data) {
  return request({
    url: '/route/route/coverImg',
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

