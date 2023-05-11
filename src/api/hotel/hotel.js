import request from '@/utils/request'

// 查询酒店管理列表
export function listHotel(query) {
  return request({
    url: '/hotel/hotel/list',
    method: 'get',
    params: query
  })
}

// 查询酒店管理详细
export function getHotel(id) {
  return request({
    url: '/hotel/hotel/' + id,
    method: 'get'
  })
}

// 随机获取一个酒店
export function getRandomHotel() {
  return request({
    url: '/hotel/hotel/randomHotel',
    method: 'get'
  })
}

// 新增酒店管理
export function addHotel(data) {
  return request({
    url: '/hotel/hotel',
    method: 'post',
    data: data
  })
}

// 修改酒店管理
export function updateHotel(data) {
  return request({
    url: '/hotel/hotel',
    method: 'put',
    data: data
  })
}

// 删除酒店管理
export function delHotel(id) {
  return request({
    url: '/hotel/hotel/' + id,
    method: 'delete'
  })
}
