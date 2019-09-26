import request from '@/utils/request'

export function selectCustomPage(params) { // 查询
  return request({
    url: '/serviceCategory/selectCustomPage',
    method: 'post',
    data: params
  })
}

export function insert(params) { // 添加
  return request({
    url: '/serviceCategory/insert',
    method: 'post',
    data: params
  })
}

export function update(params) { // 修改
  return request({
    url: '/serviceCategory/update',
    method: 'post',
    data: params
  })
}

export function myDelete(params) { // 删除
  return request({
    url: '/serviceCategory/delete/' + params,
    method: 'get'
    // params: params
  })
}
