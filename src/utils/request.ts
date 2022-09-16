import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://kumanxuan.f3322.net:8001',
  timeout: 5000,
})

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
)
instance.interceptors.response.use(
  response => Promise.resolve(response.data),
  error => Promise.reject(error),
)

export default instance
