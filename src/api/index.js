// 封装所有接口请求
import request from '@/utils/request.js'
// 获取所有频道
export const allChannelListAPI = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
// 登录
export const login = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
