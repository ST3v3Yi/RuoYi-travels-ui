import request from '@/utils/request'

// 查询景区图片列表
export function listSpotImg(query) {
  return request({
    url: '/spotImg/spotImg/list',
    method: 'get',
    params: query
  })
}

// 查询景区图片详细
export function getSpotImg(id) {
  return request({
    url: '/spotImg/spotImg/' + id,
    method: 'get'
  })
}

// 新增景区图片
export function addSpotImg(data) {
  return request({
    url: '/spotImg/spotImg',
    method: 'post',
    data: data
  })
}

// 修改景区图片
export function updateSpotImg(data) {
  return request({
    url: '/spotImg/spotImg',
    method: 'put',
    data: data
  })
}

// 删除景区图片
export function delSpotImg(id) {
  return request({
    url: '/spotImg/spotImg/' + id,
    method: 'delete'
  })
}
