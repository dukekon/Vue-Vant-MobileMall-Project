import request from '@/utils/request'

export const getHomeData = () => request.get('index/index')
