// 基于axios封装网络请求
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

export default ({ url, params = {}, method = 'GET', data = {}, headers = {} }) => {
  return request({
    url,
    params,
    method,
    data,
    headers
  })
}
