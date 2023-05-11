import request from '@/utils/request'

// 查询景区列表
export function listSpot(query) {
  return request({
    url: '/spot/spot/list',
    method: 'get',
    params: query
  })
}

// 查询景区详细
export function getSpot(id) {
  return request({
    url: '/spot/spot/' + id,
    method: 'get'
  })
}

// 随机获取两个景区
export function  getRandomSpot() {
  return request({
    url: '/spot/spot/randomSpot',
    method: 'get'
  })
}

// 新增景区
export function addSpot(data) {
  return request({
    url: '/spot/spot',
    method: 'post',
    data: data
  })
}

// 修改景区
export function updateSpot(data) {
  return request({
    url: '/spot/spot',
    method: 'put',
    data: data
  })
}

// 删除景区
export function delSpot(id) {
  return request({
    url: '/spot/spot/' + id,
    method: 'delete'
  })
}
