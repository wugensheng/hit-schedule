const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    ]
  },
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       ws: true, // 是否启用websockets
  //       changeOrigin: true, // 开启代理： 在本地会创建一个虚拟服务端，然后发送请求数据，并且同时接收请求数据，这样客户端和服务端进行数据的交互就不会有跨域问题
  //       target: 'https://wxfwdt.hit.edu.cn/app/kbcx/kbcxapp/getYjszkb' // 要访问的跨域的域名
  //     }
  //   }
  // }
  // 开发服务器设置
  devServer: {
    proxy: {
      // 规则
      // axios中相地址开头的字符串  匹配请求uri中的前几位
      '/api': {
        // 把相对地址中的域名 映射到 目标地址中
        target: 'https://wxfwdt.hit.edu.cn/app/kbcx/kbcxapp/getYjszkb',
        // 修改host请求的域名为目标域名
        // changeOrigin: false,
        changeOrigin: true,
        // 请求uri和目标uri有一个对应关系
        // 请求/api/login ==> 目标 /v1/api/login
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
