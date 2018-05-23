<template>
  <transition name="appear">
    <Spin size="large" fix v-if="spinShow">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </Spin>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  props:{
    spinShow:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
