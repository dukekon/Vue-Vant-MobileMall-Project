import request from '@/utils/request'
import type { PostGoodsNum } from '@/types/cart'

export const getCartData = () => request.get('/cart/index')

export const postDelCartItems = (ids: string) => request.post('/cart/delete', {
  productIds: ids,
})

export const postToggleChecked = (params: { isChecked: number, productIds: string }) => request.post('cart/checked', params)

export const postGoodsNum = (params: PostGoodsNum) => request.post('cart/update', params)
