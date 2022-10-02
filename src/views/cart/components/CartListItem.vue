<template>
  <van-card
      :price="item.market_price.toFixed(2)"
      :title="item.goods_name"
      :thumb="item.list_pic_url"
  >
    <template #num>
      <van-stepper v-model="number" @click.stop v-if="isEdit" min="1" />
      <span v-else>x {{ number }}</span>
    </template>
    <template #footer>
      <van-button v-if="isEdit" size="mini" @click.stop="onEditFinish(item)">完成</van-button>
      <van-button v-else size="mini" @click.stop="onEdit(item.number)">编辑</van-button>
      <van-button size="mini" @click.stop="delEvent(item.product_id)">删除</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { CartItem } from '@/types/cart'
import { postDelCartItems, postGoodsNum } from '@/api/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()


const number = ref<number>(props.item.number)
const reload = inject('reloadCart') as () => void

//# region 编辑购物车
const isEdit = ref<boolean>(false)

const onEdit = (value: number) => {
  isEdit.value = true
  number.value = value
}

const onEditFinish = (item: CartItem) => {
  isEdit.value = true

  postGoodsNum({
    goodsId: item.goods_id,
    id: item.id,
    number: number.value,
    productId: item.product_id,
  }).then(
      res => {
        if (res.errno === 0) {
          isEdit.value = false
          reload()
        }
      },
  )
}
//#endregion

//#region 删除商品
const delEvent = (id: number) => {
  delCartItem(id.toString())
}

const delCartItem = async (ids: string) => {
  postDelCartItems(ids).then(
      res => reload(),
  )
}
//#endregion
</script>

<style lang="scss" scoped>
.van-card {
  padding-top: 0;
  padding-left: 0;
  background-color: #ffffffff;

  .van-card__content {
    display: flex;
    justify-content: space-around;
  }

  .van-card__num {
    position: relative;

    .van-stepper {
      position: absolute;
      width: 100px;
      bottom: 4px;
      right: -15px;
      transform: scale(.8);
    }

    span {
      margin-right: 10px;
    }
  }
}
</style>
