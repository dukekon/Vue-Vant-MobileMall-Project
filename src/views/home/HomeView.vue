<template>
  <div class="home" v-if="$route.name === 'home'">
    <header>
      <van-search placeholder="输入关键词搜索" shape="round" readonly @click-input="onClickInput" />
    </header>
    <main>
      <TheBanner :images="banner" />
    </main>
  </div>

  <router-view v-if="$route.name === 'search'" />
</template>

<script setup lang="ts">
import TheBanner from '@/components/TheBanner.vue'

import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getHomeData } from '@/api/home'
import type { IndexData } from '@/types/home'

//#region 公共变量
const router = useRouter()
const indexData = reactive<IndexData>({
  banner: [],
})
//#endregion

//#region 初始化页面数据
const getIndexData = async () => {
  const res = await getHomeData()
  if (res.errno === 0) {
    const { banner } = res.data
    indexData.banner = banner
  }
}

getIndexData()

const { banner } = toRefs(indexData)
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
