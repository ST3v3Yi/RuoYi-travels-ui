import request from '@/utils/request'

// 查询酒店点评列表
export function listHotelComments(query) {
  return request({
    url: '/hotel/hotelComments/list',
    method: 'get',
    params: query
  })
}

// 查询酒店点评详细
export function getHotelComments(id) {
  return request({
    url: '/hotel/hotelComments/' + id,
    method: 'get'
  })
}

// 查询相应酒店评论列表
export function getCommentsList(hotelId) {
  return request({
    url: '/hotel/hotelComments/hotel/' + hotelId,
    method: 'get'
  })
}

// 获取酒店评分
export function getHotelRating(hotelId) {
  return request({
    url: '/hotel/hotelComments/rating/' + hotelId,
    method: 'get'
  })
}

// 新增酒店点评
export function addHotelComments(data) {
  return request({
    url: '/hotel/hotelComments',
    method: 'post',
    data: data
  })
}

// 修改酒店点评
export function updateHotelComments(data) {
  return request({
    url: '/hotel/hotelComments',
    method: 'put',
    data: data
  })
}

// 删除酒店点评
export function delHotelComments(id) {
  return request({
    url: '/hotel/hotelComments/' + id,
    method: 'delete'
  })
}
