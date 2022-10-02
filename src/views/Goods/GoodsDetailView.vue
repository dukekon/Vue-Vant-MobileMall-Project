<template>
  <div class="goods-detail">

    <main>
      <van-nav-bar left-text="返回"
                   left-arrow
                   :border="false"
                   @click-left="onClickLeft" />
      <TheBanner v-if="banner.length" :images="banner" />
      <img v-else class="goods-pic" :src="goodsPic" />
      <TheTips />
      <TheGoodsInfo :info="goodsInfo" />
      <TheGoodsAttribute v-if="goodsAttribute.length" :attribute="goodsAttribute" />
      <TheGoodsDesc :info="goodsInfo" />
      <TheSection title="常见问题" margin>
        <template #content>
          <TheSectionIssue :issue="issueList" />
        </template>
      </TheSection>
      <TheSection title="大家都在看">
        <template #content>
          <TheGoodsList :goodsList="relatedGoods" />
        </template>
      </TheSection>
    </main>
  </div>
  <!-- 商品导航 -->
  <van-action-bar>
    <!--    ff5000-->
    <van-action-bar-icon icon="star-o" text="已收藏" color="#333" />
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="cartNumber === 0? '' : cartNumber"
                         @click="$router.push('/cart')" />
    <van-action-bar-button type="warning" text="加入购物车" @click="showPopup" />
    <van-action-bar-button type="danger" text="立即购买" @click="showPopup" />
  </van-action-bar>
  <!-- Sku -->
  <van-popup v-model:show="showSku" position="bottom" :style="{ height: '40%' }" duration="0.15" z-index="2" closeable
             round>
    <template #default>
      <TheSkuContent :img="goodsPic" :data="goodsInfo" @changeNumber="changeNumber" />
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" round @click="addCart">确认</van-button>
    </template>
  </van-popup>
</template>

<script setup lang="ts">
import TheBanner from './components/TheBanner.vue'
import TheTips from '@/views/Goods/components/TheTips.vue'
import TheGoodsInfo from '@/views/Goods/components/TheGoodsInfo.vue'
import TheGoodsAttribute from '@/views/Goods/components/TheGoodsAttribute.vue'
import TheGoodsDesc from '@/views/Goods/components/TheGoodsDesc.vue'
import TheSection from '@/views/Goods/components/TheSection.vue'
import TheSectionIssue from '@/views/Goods/components/TheSectionIssue.vue'
import TheGoodsList from '@/components/TheGoodsList.vue'
import TheSkuContent from '@/views/Goods/components/TheSkuContent.vue'

import { useRoute } from 'vue-router'
import { getCartNumber, getGoodsDetail, getGoodsRelated, postAddCart } from '@/api/goods'
import { ref } from 'vue'
import type { Gallery, GoodsAttribute, GoodsInfo, GoodsIssue } from '@/types/goods'
import type { Goods } from '@/types/search'
import router from '@/router'
import { showToast } from 'vant'


const route = useRoute()
const goodsId = route.query?.id as string

//#region 轮播图
const banner = ref<Gallery[]>([])
const goodsPic = ref<string>('')
//endregion

//#region 商品信息
const goodsInfo = ref<GoodsInfo>(<GoodsInfo>{})
//endregion

//#region 商品属性
const goodsAttribute = ref<GoodsAttribute[]>([])
//endregion

//#region 常见问答
const issueList = ref<GoodsIssue[]>([])
//#endregion

//#region 相关商品
const relatedGoods = ref<Goods[]>([])

const getRelatedGoods = async () => {
  const res = await getGoodsRelated(goodsId)
  relatedGoods.value = res.data.goodsList
}
//#endregion

//#region 购物车栏
const cartNumber = ref<number>(0)

const getCartNum = async () => {
  const res = await getCartNumber()
  if (res.errno === 0) {
    cartNumber.value = res.data.cartTotal.goodsCount
  }
  console.log(cartNumber.value)
}

getCartNum()
//#endregion

//#region Sku
const showSku = ref<boolean>(false)
const product = ref<any[]>([])
const img = ref<string>('')
const number = ref<number>(1)

const showPopup = () => {
  if (localStorage.getItem('token')) {
    showSku.value = true
    img.value = goodsPic.value
  } else {
    showToast('请先登录')
    router.push({ name: 'login' })
  }
}

const changeNumber = (value: number) => number.value = value

const addCart = async () => {
  console.log(number.value)
  const res = await postAddCart({
    goodsId: product.value[0].goods_id,
    productId: product.value[0].id,
    number: number.value,
  })
  showSku.value = false
  if (res.errno === 0) {
    await getCartNum()
  }
}
//#endregion

//#region 初始化页面数据
const initGoodsDetail = async () => {
  // const res = await getGoodsDetail('1135051')
  const res = await getGoodsDetail(goodsId)
  if (res.errno === 0) {
    const { gallery, info, attribute, issue, productList } = res.data
    banner.value = gallery
    goodsPic.value = info.primary_pic_url
    goodsInfo.value = info
    goodsAttribute.value = attribute
    issueList.value = issue
    product.value = productList
  }
  // console.log(res)
  await getRelatedGoods()
}

initGoodsDetail()
//#endregion


//#region 返回
const onClickLeft = () => {
  history.back()
}
//#endregion
</script>

<style lang="scss" scoped>
.van-nav-bar {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}

.goods-pic {
  display: block;
  width: 100%;
}

.van-popup {
  position: relative;

  .van-button {
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translate3d(-50%, 0, 0);
    width: 95%;
  }
}

.van-action-bar {
  z-index: 2;
}
</style>
