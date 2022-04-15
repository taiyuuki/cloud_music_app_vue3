import axios from "axios"

const request = axios.create({
  timeout: 10000
})

request.defaults.baseURL = `http://localhost:3000`; //设置默认url

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(new Error('响应失败'))
})

export default request;