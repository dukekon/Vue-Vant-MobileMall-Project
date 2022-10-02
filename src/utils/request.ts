import axios from 'axios'
import { closeToast, showLoadingToast } from 'vant'

const instance = axios.create({
  baseURL: 'http://kumanxuan.f3322.net:8001',
  timeout: 5000,
})


instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
      })
      config.headers['X-Nideshop-Token'] = token
    }
    return config
  },
  error => {
    closeToast()
    return Promise.reject(error)
  },
)
instance.interceptors.response.use(
  response => {
    closeToast()
    return Promise.resolve(response.data)
  },
  error => {
    closeToast()
    return Promise.reject(error)
  },
)

export default instance
