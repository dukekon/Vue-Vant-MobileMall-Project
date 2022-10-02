<template>
  <div class="home" v-if="$route.name === 'home'">
    <header>
      <van-search placeholder="输入关键词搜索" shape="round" readonly @click-input="onClickInput" />
    </header>
    <main>
      <TheBanner :images="banners" />
      <TheChannel :channel="channels" />
    </main>
  </div>

  <router-view v-if="$route.name === 'search'" />
</template>

<script setup lang="ts">
import TheBanner from '@/components/TheBanner.vue'

import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getHomeData } from '@/api/home'
import type { Banner, Channel, IndexData } from '@/types/home'
import TheChannel from '@/views/home/components/TheChannel.vue'

//#region 公共变量
const router = useRouter()
//#endregion

//#region 轮播图
const banners = ref<Banner[]>([])
//#endregion

//#region 分类图标
const channels = ref<Channel[]>([])
//#endregion

//#region 品牌提供商

//#endregion

//#region 初始化页面数据
const getIndexData = async () => {
  const res = await getHomeData()
  if (res.errno === 0) {
    const { banner, channel } = res.data
    banners.value = banner
    channels.value = channel
  }
  console.log(res.data)
}
getIndexData()
//#endregion

//#region 事件
const onClickInput = () => {
  router.push({ name: 'search' })
}
//#endregion

</script>

<style lang="scss" scoped>
/*无样式*/
</style>
