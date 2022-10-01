<template>
  <van-tabbar v-model="$route.name">
    <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item name="" icon="label-o" to="">专题</van-tabbar-item>
    <van-tabbar-item name="" icon="apps-o" to="">分类</van-tabbar-item>
    <van-tabbar-item name="cart" icon="cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item name="user" icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
// 无脚本
</script>

<style lang="scss" scoped>
/*无样式*/
</style>
