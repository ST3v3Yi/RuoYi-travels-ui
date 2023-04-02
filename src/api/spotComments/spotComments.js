import request from '@/utils/request'

// 查询景区评分评论列表
export function listSpotComments(query) {
  return request({
    url: '/spotComments/spotComments/list',
    method: 'get',
    params: query
  })
}

// 查询景区评分评论详细
export function getSpotComments(id) {
  return request({
    url: '/spotComments/spotComments/' + id,
    method: 'get'
  })
}

// 新增景区评分评论
export function addSpotComments(data) {
  return request({
    url: '/spotComments/spotComments',
    method: 'post',
    data: data
  })
}

// 修改景区评分评论
export function updateSpotComments(data) {
  return request({
    url: '/spotComments/spotComments',
    method: 'put',
    data: data
  })
}

// 删除景区评分评论
export function delSpotComments(id) {
  return request({
    url: '/spotComments/spotComments/' + id,
    method: 'delete'
  })
}
