import request from '@/utils/request'

// 查询酒店房间列表
export function listRooms(query) {
  return request({
    url: '/travels/rooms/list',
    method: 'get',
    params: query
  })
}

// 查询酒店房间详细
export function getRooms(id) {
  return request({
    url: '/travels/rooms/' + id,
    method: 'get'
  })
}

// 新增酒店房间
export function addRooms(data) {
  return request({
    url: '/travels/rooms',
    method: 'post',
    data: data
  })
}

// 修改酒店房间
export function updateRooms(data) {
  return request({
    url: '/travels/rooms',
    method: 'put',
    data: data
  })
}

// 删除酒店房间
export function delRooms(id) {
  return request({
    url: '/travels/rooms/' + id,
    method: 'delete'
  })
}
