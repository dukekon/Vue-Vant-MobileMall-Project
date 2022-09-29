<template>
  <section class="margin">
    <div class="title" v-if="title">
      <h3>{{ title }}</h3>
      <div class="title__line"></div>
    </div>
    <slot name="content"></slot>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  margin?: boolean
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
section {
  padding: 20px 0;
  background-color: #fff;

  .title {
    margin-bottom: 14px;
    position: relative;
    display: flex;
    justify-content: center;

    h3 {
      padding: 0 10px;
      font-size: 16px;
      font-weight: 700;
      background-color: #fff;
      z-index: 1;
    }

    .title__line {
      position: absolute;
      top: calc(50% - 1px);
      width: 200px;
      height: 1px;
      background-color: #dedede;
    }
  }

}

.margin {
  margin-bottom: 20px;
}
</style>
