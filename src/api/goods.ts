import request from '@/utils/request'

export const getGoodsDetail = (id: string) => request.get('/goods/detail', {
  params: {
    id: id,
  },
})

export const getGoodsRelated = (id: string) => request.get('/goods/related', {
  params: {
    id: id,
  },
})

// Sku
export const postAddCart = (params: any) => request.post('/cart/add', params)

export const getCartNumber = () => request.post('/cart/goodscount')
