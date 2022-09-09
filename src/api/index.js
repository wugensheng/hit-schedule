// 封装所有接口请求
import request from '@/utils/request.js'
import qs from 'qs'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}
