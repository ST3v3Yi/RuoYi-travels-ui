import request from '@/utils/request'

// 查询酒店房间列表
export function listRooms(query) {
  return request({
    url: '/travels/rooms/list',
    method: 'get',
    params: query
  })
}

// 查询相应酒店的房间信息
export function getHotelRooms(hotelId) {
  return request({
    url: '/travels/rooms/hotel/' + hotelId,
    method: 'get'
  })
}

// 查询酒店最低价格
export function getMinPrice(hotelId) {
  return request({
    url: '/travels/rooms/price/' + hotelId,
    method: 'get'
  })
}

// 查询不同房型对应的酒店ID
export function getHotelId(type) {
  return request({
    url: '/travels/rooms/room/' + type,
    method: 'get'
  })
}

// 贪心算法求得酒店可行性
export function getFeasibility(data) {
  return request({
    url: '/travels/rooms/feasibility',
    method: 'post',
    data: data
  })
}

// 查询酒店房间详细
export function getRooms(id) {
  return request({
    url: '/travels/rooms/' + id,
    method: 'get'
  })
}

// 获取可行房间
export function getRoomFeasibility(data) {
  return request({
    url: '/travels/rooms/roomFeasibility',
    method: 'post',
    data: data
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
