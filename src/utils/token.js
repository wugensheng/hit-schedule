// 封装三个方法，专门操作token

const key = 'geek itheima'

// 获取token
export const getToken = () => {
  localStorage.getItem(key)
}
// 设置token
export const setToken = (token) => {
  localStorage.setItem(key, token)
}
// 删除token
export const deleteToken = () => {
  localStorage.removeItem(key)
}
