// 基于axios封装网络请求
import axios from 'axios'

const request = axios.create({
  // baseURL: 'https://wxfwdt.hit.edu.cn/app/kbcx/kbcxapp/getYjszkb',
  baseURL: 'http:101.43.133.230:8081/getYjskb',
  // baseURL: '/api',
  timeout: 20000
})

export default ({ url = '', params = {}, method = 'GET', data = {}, headers = {} }) => {
  console.log('data: ', data)
  return request({
    url,
    params,
    method,
    data,
    headers
  })
}
