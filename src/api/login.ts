import request from '@/utils/request'

export const postLogin = (data: any) => request.post('/auth/loginByWeb', data)
