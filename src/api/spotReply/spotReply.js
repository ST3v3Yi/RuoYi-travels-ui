import request from '@/utils/request'

// 查询景区回复表列表
export function listSpotReply(query) {
  return request({
    url: '/spotReply/spotReply/list',
    method: 'get',
    params: query
  })
}

// 查询景区回复表详细
export function getSpotReply(id) {
  return request({
    url: '/spotReply/spotReply/' + id,
    method: 'get'
  })
}

export function getReplyList(commentId) {
  return request({
    url: '/spotReply/spotReply/list/' + commentId,
    method: 'get'
  })
}

// 新增景区回复表
export function addSpotReply(data) {
  return request({
    url: '/spotReply/spotReply',
    method: 'post',
    data: data
  })
}

// 修改景区回复表
export function updateSpotReply(data) {
  return request({
    url: '/spotReply/spotReply',
    method: 'put',
    data: data
  })
}

// 删除景区回复表
export function delSpotReply(id) {
  return request({
    url: '/spotReply/spotReply/' + id,
    method: 'delete'
  })
}
