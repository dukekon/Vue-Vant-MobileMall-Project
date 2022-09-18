import request from '@/utils/request'

export const getSearchData = () => request.get('search/index')

export const getNoticeData = (keyword: string) => request.get('search/helper', {
  params: {
    keyword,
  },
})

export const getGoodsList = (params: any) => request.get('goods/list', { params })

export const postClearHistory = () => request.post('search/clearhistory')
