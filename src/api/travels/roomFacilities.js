import request from '@/utils/request'

// 查询房间设施列表
export function listFacilities(query) {
  return request({
    url: '/travels/roomFacilities/list',
    method: 'get',
    params: query
  })
}

// 查询房间设施详细
export function getFacilities(id) {
  return request({
    url: '/travels/roomFacilities/' + id,
    method: 'get'
  })
}

export function getRoomFacilities(roomId) {
  return request({
    url: '/travels/roomFacilities/roomId/' + roomId,
    method: 'get'
  })
}

// 新增房间设施
export function addFacilities(data) {
  return request({
    url: '/travels/roomFacilities',
    method: 'post',
    data: data
  })
}

// 修改房间设施
export function updateFacilities(data) {
  return request({
    url: '/travels/roomFacilities',
    method: 'put',
    data: data
  })
}

// 删除房间设施
export function delFacilities(id) {
  return request({
    url: '/travels/roomFacilities/' + id,
    method: 'delete'
  })
}
