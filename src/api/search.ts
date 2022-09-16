import request from '@/utils/request'

export const getSearchData = () => request.get('search/index')
