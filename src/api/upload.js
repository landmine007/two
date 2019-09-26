/**
 * Created by Administrator on 2018/11/9 0009.
 */
import request from '@/utils/request'

// export function fielUpload(params) { // 图片上传
//   return request({
//     url: '/file/upload',
//     method: 'post',
//     data: params,
//     headers: { 'Content-Type': 'multipart/form-data' }
//   })
// }

export function fielDelete(params) { // 图片删除
  return request({
    url: '/file/delete' + '?filePath=' + params,
    method: 'get'
    // data: params,
    // headers: { 'Content-Type': 'multipart/form-data' }
  })
}
