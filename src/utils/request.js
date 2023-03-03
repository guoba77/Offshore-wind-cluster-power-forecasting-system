import axios from 'axios'
import { MessageBox, Notification } from 'element-ui'
import store from '../store'
// const URL = require('url')
// const urlInfo = URL.parse(window.location.href, true)
// const baseURL = `${urlInfo.protocol}//${urlInfo.hostname}:8099/api`

// 动态判断basePath
// var basePath = ''
// if (process.env.NODE_ENV === 'development') {
//   // alert('开发环境')
//   basePath = process.env.BASE_API
// } else {
//   // alert('生产环境')
//   const protocol = location.protocol
//   const hostname = location.hostname
//   basePath = protocol + '//' + hostname + ':8081/'
// }

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 40000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['token'] = localStorage.getItem('token')// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (isNaN(res.code)) { // 不存在code字段
      return response.data
    } else {
      if (res.code !== 0) { // code为非0是抛错 可结合自己业务进行修改
        Notification({
          title: 'Error',
          message: res.msg,
          type: 'error',
          duration: 5000,
          position: 'bottom-right'
        })
        // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          MessageBox.confirm('Token已失效，你可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          })
        }
        return Promise.reject(res.msg)
      } else {
        return response.data
      }
    }
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    Notification({
      title: 'Error',
      message: error.message,
      type: 'error',
      duration: 5000,
      position: 'bottom-right'
    })
    return Promise.reject(error)
  }
)

export default service
