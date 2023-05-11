import request from '@/utils/request'

// 查询用户浏览记录列表
export function listUserRecords(query) {
  return request({
    url: '/userRecords/userRecords/list',
    method: 'get',
    params: query
  })
}

// 查询用户浏览记录详细
export function getUserRecords(id) {
  return request({
    url: '/userRecords/userRecords/' + id,
    method: 'get'
  })
}

// 新增用户浏览记录
export function addUserRecords(data) {
  return request({
    url: '/userRecords/userRecords',
    method: 'post',
    data: data
  })
}

// 修改用户浏览记录
export function updateUserRecords(data) {
  return request({
    url: '/userRecords/userRecords',
    method: 'put',
    data: data
  })
}

// 删除用户浏览记录
export function delUserRecords(id) {
  return request({
    url: '/userRecords/userRecords/' + id,
    method: 'delete'
  })
}
