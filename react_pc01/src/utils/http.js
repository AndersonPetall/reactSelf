// //封装axios

// //实例化  请求拦截器   响应拦截器
// import axios  from "axios";

// const http = axios.create({
//     baseURL:'http://geetk.itheima.net/v1_0',
//     timeout:5000
// })
// //添加请求拦截器
// http.interceptors.requrest.use((config)=>{
//     return config
// },(error)=>{
//     return Promise.reject(error)
// })
// //添加响应拦截器
// http.interceptors.response.use((response)=>{
//     //2xx 范围内的状态码都会触发该函数
//     //对响应数据做点什么
//     return response
// },(error)=>{
//     //超出2xx 范围内的状态码都会触发该函数
//     //对响应错误做点什么
//     return Promise.reject(error)
// })
// export {http}



import axios from 'axios'
import {getToken,removeToken,history} from '@/utils'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config)=> {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error?.response?.status === 401) {
      // // 删除token
      removeToken()
      // 跳转到登录页  reactRouter默认状态之下  并不支持在组件之外完成路由跳转
      //window.location.href('/login')  需要刷新后才能跳转
      history.replace('/login')   //直接跳转
    }
    return Promise.reject(error)
})

export { http }