export const priceFixed = (price: number | string): string => {
  return '￥' + price + '元'
}
export const priceFixedNoUnit = (price: number): string => {
  return price.toFixed(2)
}
