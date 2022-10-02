<template>
  <div class="cart">
    <header>
      <van-nav-bar
          title="购物车"
          left-text="返回"
          left-arrow
          @click-left="back" />
    </header>
    <main>
      <div class="cart-list">
        <!-- v-model="groupChecked" -->
        <van-checkbox-group ref="checkboxGroup" v-model="checked" direction="horizontal">
          <van-checkbox v-for="item in cartItems" :name="item.goods_id.toString()"
                        label-disabled
                        @click.stop="toggleChecked(item)"
                        :key="item.id">
            <CartListItem :item="item" />
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <van-submit-bar :price="checkedGoodsAmount" button-text="提交订单" @submit="">
        <van-checkbox v-model="checkedAll">{{ checkedAll ? '全不选' : '全选' }}</van-checkbox>
        <template #tip>
          你的收货地址不支持配送, <span @click="">修改地址</span>
        </template>
      </van-submit-bar>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { getCartData, postDelCartItems, postToggleChecked } from '@/api/cart'
import type { CartItem } from '@/types/cart'
import CartListItem from '@/views/cart/components/CartListItem.vue'

//#region 购物车物品列表
const cartItems = ref<CartItem[]>([])
//#endregion

//#region 选中状态
const checked = ref<string[]>([])
// const checkedAll = ref<boolean>(false)

//反选
const toggleChecked = (item: CartItem) => {
  postToggleChecked({
    isChecked: item.checked === 1 ? 0 : 1,
    productIds: item.product_id.toString(),
  }).then(
      res => {
        freshenData(res.data)
      },
  )
}

//全部反选
const checkedAll = computed({
  get: () => {
    return checked.value.length === cartItems.value.length
  },
  set: (value) => {
    const arr: number[] = []
    cartItems.value.map(item => {
      arr.push(item.product_id)
    })
    postToggleChecked({
      isChecked: value === true ? 1 : 0,
      productIds: arr.join(),
    }).then(
        res => {
          if (res.errno === 0) {
            freshenData(res.data)
          }
        },
    )
  },
})

//#endregion

//#region 删除商品
const delEvent = (id: number) => {
  delCartItem(id.toString())
}

const delCartItem = async (ids: string) => {
  postDelCartItems(ids).then(
      res => initCartData(),
  )
}
//#endregion

//#region 订单提交栏
const checkedGoodsAmount = ref<number>(0)
//endregion

//#region 初始化购物车页面数据
provide('reloadCart', () => initCartData())

const initCartData = async () => {
  const res = await getCartData()
  if (res.errno === 0) {
    freshenData(res.data)
  }
}
initCartData()

//刷新数据
const freshenData = (data: { cartList: CartItem[], cartTotal: any }) => {
  const { cartList, cartTotal } = data
  cartItems.value = cartList
  checkedGoodsAmount.value = cartTotal.checkedGoodsAmount * 100
  checked.value = []
  cartList.map(item => {
    if (item.checked === 1) {
      checked.value.push(item.goods_id.toString())
    }
  })
}
//#endregion

//#region 返回
const back = () => history.back()
//endregion

// const onSubmit = () => showToast('点击按钮')
// const onClickLink = () => showToast('修改地址')
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 2;
}

.cart {
  .cart-list {
    padding-bottom: 100px;
    //height: 1000px;
  }

  .van-checkbox-group {
    .van-checkbox {
      margin: 0;
      padding-left: 10px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #f5f5f5;

      ::v-deep(.van-checkbox__icon) {
        position: relative;
        top: -10px;
      }

      ::v-deep(.van-checkbox__label ) {
        flex: 1;
      }
    }
  }
}


</style>
