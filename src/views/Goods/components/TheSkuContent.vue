<template>
  <div class="sku-content">
    <van-image
        width="1.2rem"
        height="1.2rem"
        :src="img"
    />
    <div class="goods-info">
      <p class="goods-info__price">{{ priceFixed(data.retail_price) }}</p>
      <p class="goods-info__number">库存：{{ data.goods_number }}{{ data.goods_unit }}</p>
      <van-field name="stepper" label="购买数量">
        <template #input>
          <van-stepper v-model="count" @change="changeNumber" />
        </template>
      </van-field>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { priceFixed } from '@/utils/priceFixed'
import type { GoodsInfo } from '@/types/goods'

interface Props {
  img: string
  data: GoodsInfo
  // count: number
}

defineProps<Props>()

const count = ref<number>(1)

interface Emit {
  (e: 'changeNumber', value: number): void
}

const emit = defineEmits<Emit>()

const changeNumber = (value: number) => {
  emit('changeNumber', value)
}
</script>

<style lang="scss" scoped>
.sku-content {
  margin: 40px 20px 0;
  display: flex;

  .goods-info {
    display: flex;
    justify-content: space-between;
    flex-flow: column;
    margin-left: 20px;

    &__price {
      font-size: 22px;
      color: red;
    }

    &__number {
      position: relative;
      top: -10px;
      color: #727171;
    }

    .van-field {
      padding: 0;
    }
  }
}
</style>
