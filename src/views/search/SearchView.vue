<template>
  <div class="search">
    <header>
      <van-search :placeholder="placeholder" show-action @cancel="onCancel" />
    </header>
    <main>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchData } from '@/api/search'

//#region 公共变量
const router = useRouter()
const placeholder = ref<string>('')
const historyList = ref<[]>([])
const hotList = ref<[]>([])
//#endregion

//#region 初始化页面数据
const getIndexData = async () => {
  const res = await getSearchData()
  if (res.errno === 0) {
    const { defaultKeyword, historyKeywordList, hotKeywordList } = res.data
    placeholder.value = defaultKeyword.keyword
    historyList.value = historyKeywordList
    hotList.value = hotKeywordList
  }
}

getIndexData()
//#endregion

//#region 顶部搜索框
//#endregion

//#region 事件
const onCancel = () => {
  router.go(-1)
}
//#endregion
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
