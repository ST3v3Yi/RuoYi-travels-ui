import request from '@/utils/request'

// 查询距离记录列表
export function listAround(query) {
  return request({
    url: '/around/around/list',
    method: 'get',
    params: query
  })
}

// 查询距离记录详细
export function getAround(id) {
  return request({
    url: '/around/around/' + id,
    method: 'get'
  })
}

// 新增距离记录
export function addAround(data) {
  return request({
    url: '/around/around',
    method: 'post',
    data: data
  })
}

// 修改距离记录
export function updateAround(data) {
  return request({
    url: '/around/around',
    method: 'put',
    data: data
  })
}

// 删除距离记录
export function delAround(id) {
  return request({
    url: '/around/around/' + id,
    method: 'delete'
  })
}
