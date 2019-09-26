import request from '@/utils/request'

export function selectSidebar(params) { // 查询
  return request({
    url: '/sidebar/list',
    method: 'post',
    data: params
  })
}
