<template>
  <section class="tips">
    <span v-for="(item, index) in tips" :key="index">
      <van-icon name="checked" />
      {{ item }}
    </span>
  </section>
</template>

<script setup lang="ts">
const tips = ['30天无忧退货', '48小时快速退费', '满88元免运费']
</script>

<style lang="scss" scoped>
.tips {
  //background-color: #e3e2e2;

  span {
    display: inline-block;
    text-align: center;
    line-height: 2.2;
    width: 33.33333%;

    .van-icon-checked {
      color: #089d14;
    }
  }
}
</style>
