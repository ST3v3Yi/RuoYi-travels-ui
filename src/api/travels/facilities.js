import request from '@/utils/request'

// 查询设施列表
export function listFacilities(query) {
  return request({
    url: '/travels/facilities/list',
    method: 'get',
    params: query
  })
}

// 查询设施详细
export function getFacilities(id) {
  return request({
    url: '/travels/facilities/' + id,
    method: 'get'
  })
}

// 新增设施
export function addFacilities(data) {
  return request({
    url: '/travels/facilities',
    method: 'post',
    data: data
  })
}

// 修改设施
export function updateFacilities(data) {
  return request({
    url: '/travels/facilities',
    method: 'put',
    data: data
  })
}

// 删除设施
export function delFacilities(id) {
  return request({
    url: '/travels/facilities/' + id,
    method: 'delete'
  })
}
